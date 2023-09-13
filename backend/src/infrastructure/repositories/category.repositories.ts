import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/domain/repositories';
import { PrismaService } from '../database/prisma/prisma.service';
import { CategoryM } from 'src/domain/model';
import * as crypto from 'crypto';

@Injectable()
export class DatabaseCategoryRepository implements CategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async insert(categoryName: string): Promise<CategoryM> {
    const newId = crypto.randomUUID();
    const result = await this.prismaService.category.create({
      data: {
        id: newId,
        name: categoryName,
      },
    });

    console.log('Result', result);

    return await this.prismaService.category.findUnique({
      where: { id: newId },
    });
  }

  async findAll(): Promise<CategoryM[]> {
    const allCategories = await this.prismaService.category.findMany();
    return allCategories;
  }

  async findById(id: string): Promise<CategoryM> {
    const result = await this.prismaService.category.findUnique({
      where: { id },
    });
    console.log('Result', result);
    return result;
  }
}
