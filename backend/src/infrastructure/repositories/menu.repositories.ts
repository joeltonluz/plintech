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

  async insert(menu: MenuM): Promise<MenuM> {
    const result = await this.prismaService.menu.create({
      data: {
        period: menu.period,
      },
    });

    const menuId = result.id;
    for (const product of menu.products) {
      await this.prismaService.productsInMenus.create({
        data: {
          menuId,
          productId: product,
        },
      });
    }

    return result;
    // return {
    //   id: '123',
    //   period: 'day',
    //   products: [],
    // };
  }

  async findAll(): Promise<MenuM[]> {
    const result = await this.prismaService.menu.findMany();
    const resultMany = await this.prismaService.menu.findMany({
      include: {
        products: true,
      },
    });

    console.log('resultmany', resultMany);

    return result;
  }
}
