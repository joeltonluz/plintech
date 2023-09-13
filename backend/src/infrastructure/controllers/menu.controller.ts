import { Controller, Get, Inject } from '@nestjs/common';
import { MenuFactoryModule } from 'src/usecases/factories/menu-factory.module';
import { GetMenusUseCase } from 'src/usecases/menu/getMenus.usecase';

@Controller('menu')
export class MenuController {
  constructor(
    @Inject(MenuFactoryModule.GET_MENUS)
    private readonly getMenusUc: GetMenusUseCase,
  ) {}

  @Get()
  async getMenus() {
    const result = await this.getMenusUc.execute();
    return result;
  }
}
