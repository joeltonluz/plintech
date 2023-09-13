import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { MenuFactoryModule } from 'src/usecases/factories/menu-factory.module';
import {
  AddMenuUseCase,
  DeleteMenuUseCase,
  GetMenuUseCase,
  GetMenusUseCase,
} from 'src/usecases/menu';
import { AddMenuDto } from './dto/menu.dto';

@Controller('menu')
export class MenuController {
  constructor(
    @Inject(MenuFactoryModule.ADD_MENU)
    private readonly addMenuUc: AddMenuUseCase,
    @Inject(MenuFactoryModule.GET_MENUS)
    private readonly getMenusUc: GetMenusUseCase,
    @Inject(MenuFactoryModule.GET_MENU)
    private readonly getMenuUc: GetMenuUseCase,
    @Inject(MenuFactoryModule.DEL_MENU)
    private readonly deleteMenuUc: DeleteMenuUseCase,
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

  @Get(':id')
  async getMenu(@Param('id') id: string) {
    const result = await this.getMenuUc.execute(id);
    return result;
  }

  @Delete(':id')
  async deleteMenu(@Param('id') id: string) {
    return await this.deleteMenuUc.execute(id);
  }
}
