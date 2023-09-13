import { Injectable } from '@nestjs/common';
import { MenuRepository } from 'src/domain/repositories';
import { PrismaService } from '../database/prisma/prisma.service';
import { MenuM } from 'src/domain/model';
import { ExceptionsService } from '../exceptions/exceptions.service';

@Injectable()
export class DatabaseMenuRepository implements MenuRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly exceptionService: ExceptionsService,
  ) {}

  async findAll(): Promise<MenuM[]> {
    const result = await this.prismaService.menu.findMany();

    return result;
    // return [
    //   {
    //     id: '1231asfd123asf123',
    //     period: 'day',
    //   },
    // ];
  }
}
