import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/domain/repositories';
import { PrismaService } from '../database/prisma/prisma.service';
import { CategoryM } from 'src/domain/model';
import { ExceptionsService } from '../exceptions/exceptions.service';

@Injectable()
export class DatabaseCategoryRepository implements CategoryRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly exceptionService: ExceptionsService,
  ) {}

  async insert(categoryName: string): Promise<CategoryM> {
    const result = await this.prismaService.category.create({
      data: {
        name: categoryName,
      },
    });

    return result;
  }

  async findAll(): Promise<CategoryM[]> {
    const result = await this.prismaService.category.findMany({
      include: {
        products: true,
      },
    });

    return result;
  }

  async findById(id: string): Promise<CategoryM> {
    const result = await this.prismaService.category.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });

    return result;
  }

  async updateContent(id: string, name: string): Promise<CategoryM> {
    const result = await this.prismaService.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return result;
  }

  async deleteById(id: string): Promise<void> {
    const hasProducts = await this.prismaService.product.findMany({
      where: {
        categoryId: id,
      },
    });

    if (!!hasProducts.length)
      this.exceptionService.badRequestException({
        message: 'there are linked products',
      });

    await this.prismaService.category.delete({
      where: { id },
    });

    return;
  }
}
