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

    return await this.findById(newId);
  }

  async findAll(): Promise<CategoryM[]> {
    const result = await this.prismaService.category.findMany();

    return result;
  }

  async findById(id: string): Promise<CategoryM> {
    const result = await this.prismaService.category.findUnique({
      where: { id },
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
    try {
      const result = await this.prismaService.category.delete({
        where: { id },
      });

      console.log('Result Delte', result);
      return;
    } catch (erro) {
      throw erro;
    }
  }
}
