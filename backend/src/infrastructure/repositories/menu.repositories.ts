import { Injectable } from '@nestjs/common';
import { MenuRepository } from 'src/domain/repositories';
import { PrismaService } from '../database/prisma/prisma.service';
import { MenuM, ProductM } from 'src/domain/model';
import { ExceptionsService } from '../exceptions/exceptions.service';

interface IMenu {
  id: string;
  period: string;
  products: ProductM[];
}
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
  }

  async findAll(): Promise<MenuM[]> {
    const result: MenuM[] = [];

    const arrayMenus = await this.prismaService.menu.findMany({
      select: {
        id: true,
        period: true,
      },
    });

    if (!arrayMenus) return;

    const resultMenus: any[] = [];
    for (const menu of arrayMenus) {
      const resultProdInMenu =
        await this.prismaService.productsInMenus.findMany({
          where: {
            menuId: menu.id,
          },
          select: {
            productId: true,
          },
        });

      const productList: string[] = [];
      for (const product of resultProdInMenu) {
        productList.push(product.productId);
      }
      const resultProducts = await this.prismaService.product.findMany({
        where: {
          id: { in: productList },
        },
        include: {
          category: true,
        },
      });

      resultMenus.push({
        id: menu.id,
        period: menu.period,
        products: [...resultProducts],
      });
    }

    result.push(...resultMenus);

    return result;
  }
}
