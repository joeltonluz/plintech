import { Injectable } from '@nestjs/common';
import { MenuRepository } from 'src/domain/repositories';
import { PrismaService } from '../database/prisma/prisma.service';
import { MenuM } from 'src/domain/model';
import { ExceptionsService } from '../exceptions/exceptions.service';
import * as moment from 'moment';

@Injectable()
export class DatabaseMenuRepository implements MenuRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly exceptionService: ExceptionsService,
  ) {}

  getPeriodMoment(): string {
    const hour = moment().hour();
    return hour >= 18 || hour < 6 ? 'NIGHT' : 'DAY';
  }

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

  async find(): Promise<MenuM[]> {
    const result: any[] = [];

    const resultMenu = await this.prismaService.menu.findUnique({
      where: {
        period: this.getPeriodMoment(),
      },
      select: {
        id: true,
        period: true,
      },
    });

    if (!resultMenu) return;

    const resultProdInMenu = await this.prismaService.productsInMenus.findMany({
      where: {
        menuId: resultMenu.id,
      },
      select: {
        productId: true,
      },
    });

    const productList = [
      ...new Set(resultProdInMenu.map((product) => product.productId)),
    ];

    const resultProducts = await this.prismaService.product.findMany({
      where: {
        id: { in: productList },
      },
      include: {
        category: true,
      },
    });

    const categoriesList = [
      ...new Set(resultProducts.map((product) => product.categoryId)),
    ];

    const resultCategories = await this.prismaService.category.findMany({
      where: {
        id: {
          in: [...categoriesList],
        },
      },
      include: {
        products: {
          where: {
            id: {
              in: [...productList],
            },
          },
        },
      },
    });

    result.push({
      id: resultMenu.id,
      period: resultMenu.period,
      products: [...resultCategories],
    });

    return result;
  }

  async findById(id: string): Promise<MenuM> {
    const resultMenu = await this.prismaService.menu.findUnique({
      where: { id },
    });

    if (!resultMenu) return;

    const resultProdInMenu = await this.prismaService.productsInMenus.findMany({
      where: {
        menuId: resultMenu.id,
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

    const result: any = {
      id: resultMenu.id,
      period: resultMenu.period,
      products: [...resultProducts],
    };

    return result;
  }

  async updateContent(menu: MenuM): Promise<MenuM> {
    await this.prismaService.productsInMenus.deleteMany({
      where: {
        menuId: menu.id,
      },
    });

    for (const product of menu.products) {
      await this.prismaService.productsInMenus.create({
        data: {
          menuId: menu.id,
          productId: product,
        },
      });
    }

    return await this.findById(menu.id);
  }

  async deleteById(id: string): Promise<void> {
    await this.prismaService.$transaction([
      this.prismaService.productsInMenus.deleteMany({
        where: {
          menuId: id,
        },
      }),
      this.prismaService.menu.delete({ where: { id } }),
    ]);

    return;
  }
}
