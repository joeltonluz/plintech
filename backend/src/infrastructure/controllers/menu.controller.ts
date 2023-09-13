import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { MenuFactoryModule } from 'src/usecases/factories/menu-factory.module';
import { AddMenuUseCase } from 'src/usecases/menu';
import { GetMenusUseCase } from 'src/usecases/menu/getMenus.usecase';
import { AddMenuDto } from './dto/menu.dto';

@Controller('menu')
export class MenuController {
  constructor(
    @Inject(MenuFactoryModule.ADD_MENU)
    private readonly addMenuUc: AddMenuUseCase,
    @Inject(MenuFactoryModule.GET_MENUS)
    private readonly getMenusUc: GetMenusUseCase,
  ) {}

  @Post()
  async addMenu(@Body() menuDto: AddMenuDto) {
    const result = await this.addMenuUc.execute(menuDto);

    return result;
  }

  @Get()
  async getMenus() {
    const result = await this.getMenusUc.execute();
    return result;
  }
}
