import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/domain/repositories';
import { PrismaService } from '../database/prisma/prisma.service';
import { CategoryM } from 'src/domain/model';

@Injectable()
export class DatabaseCategoryRepository implements CategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  // async insert(category: CategoryM): Promise<CategoryM> {
  //   const result = await this.prismaService.category.create({
  //     data: {
  //       id: crypto.randomUUID(),
  //       name: category.name,
  //     },
  //   });
  //   console.log('oolha só ', result);
  //   return {
  //     id: '123',
  //     name: category.name,
  //   };
  // }

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
