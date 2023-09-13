import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/domain/repositories';
import { PrismaService } from '../database/prisma/prisma.service';
import { ProductM } from 'src/domain/model';

@Injectable()
export class DatabaseProductRepository implements ProductRepository {
  constructor(private readonly prismaService: PrismaService) {}

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
