import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/domain/repositories';
import { PrismaService } from '../database/prisma/prisma.service';
import { ProductM } from 'src/domain/model';
import * as crypto from 'crypto';
import { ExceptionsService } from '../exceptions/exceptions.service';

@Injectable()
export class DatabaseProductRepository implements ProductRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly exceptionService: ExceptionsService,
  ) {}

  async isValidCategory(id: string) {
    const result = await this.prismaService.category.findUnique({
      where: { id },
    });

    return !!result;
  }

  async insert(product: ProductM): Promise<ProductM> {
    const resultCategory = await this.isValidCategory(product.categoryId);
    if (!resultCategory)
      this.exceptionService.notFoundException({
        message: 'category must be valid',
      });

    const newId = crypto.randomUUID();
    const result = await this.prismaService.product.create({
      data: {
        id: newId,
        ...product,
      },
    });

    return result;
  }

  async findAll(): Promise<ProductM[]> {
    const result = await this.prismaService.product.findMany();

    return result;
  }

  async findById(id: string): Promise<ProductM> {
    const result = await this.prismaService.product.findUnique({
      where: { id },
    });

    return result;
  }

  async updateContent(product: ProductM): Promise<ProductM> {
    const resultCategory = await this.isValidCategory(product.categoryId);
    if (!resultCategory)
      this.exceptionService.notFoundException({
        message: 'category must be valid',
      });

    const result = await this.prismaService.product.update({
      where: {
        id: product.id,
      },
      data: {
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        categoryId: product.categoryId,
      },
    });

    return result;
  }

  async deleteById(id: string): Promise<void> {
    try {
      await this.prismaService.product.delete({ where: { id } });
      return;
    } catch (error) {
      this.exceptionService.badRequestException(error.message);
    }
  }
}
