import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/domain/repositories';
import { PrismaService } from '../database/prisma/prisma.service';
import { CategoryM } from 'src/domain/model';

@Injectable()
export class DatabaseCategoryRepository implements CategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  // async insert(category: CategoryM): Promise<CategoryM> {
  //   const cate
  // }

  async findAll(): Promise<CategoryM[]> {
    const allCategories = await this.prismaService.category.findMany();
    return allCategories;
  }

  // async findById(id: string): Promise<CategoryM> {
  //   console.log('implements');
  // }
}
