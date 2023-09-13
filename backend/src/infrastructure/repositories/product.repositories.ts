import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/domain/repositories';
import { PrismaService } from '../database/prisma/prisma.service';
import { ProductM } from 'src/domain/model';
import * as crypto from 'crypto';

@Injectable()
export class DatabaseProductRepository implements ProductRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async insert(product: ProductM): Promise<ProductM> {
    const IsValidCategory = await this.prismaService.category.findUnique({
      where: { id: product.categoryId },
    });

    if (!IsValidCategory) throw new Error('category must be valid');

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
}
