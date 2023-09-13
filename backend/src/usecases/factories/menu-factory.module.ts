import { DynamicModule, Module } from '@nestjs/common';
import { LoggerModule } from 'src/infrastructure/logger/logger.module';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
import { DatabaseMenuRepository } from 'src/infrastructure/repositories/menu.repositories';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import {
  AddMenuUseCase,
  DeleteMenuUseCase,
  GetMenuUseCase,
  GetMenusUseCase,
} from '../menu';

@Module({
  imports: [LoggerModule, RepositoriesModule],
})
export class MenuFactoryModule {
  static ADD_MENU = 'addMenu';
  static GET_MENUS = 'getMenus';
  static GET_MENU = 'getMenu';
  static DEL_MENU = 'delMenu';

  static register(): DynamicModule {
    return {
      module: MenuFactoryModule,
      providers: [
        {
          inject: [LoggerService, DatabaseMenuRepository],
          provide: MenuFactoryModule.ADD_MENU,
          useFactory: (
            logger: LoggerService,
            menuRepository: DatabaseMenuRepository,
          ) => new AddMenuUseCase(logger, menuRepository),
        },
        {
          inject: [LoggerService, DatabaseMenuRepository],
          provide: MenuFactoryModule.GET_MENUS,
          useFactory: (
            logger: LoggerService,
            menuRepository: DatabaseMenuRepository,
          ) => new GetMenusUseCase(logger, menuRepository),
        },
        {
          inject: [LoggerService, DatabaseMenuRepository],
          provide: MenuFactoryModule.GET_MENU,
          useFactory: (
            logger: LoggerService,
            menuRepository: DatabaseMenuRepository,
          ) => new GetMenuUseCase(logger, menuRepository),
        },
        {
          inject: [LoggerService, DatabaseMenuRepository],
          provide: MenuFactoryModule.DEL_MENU,
          useFactory: (
            logger: LoggerService,
            menuRepository: DatabaseMenuRepository,
          ) => new DeleteMenuUseCase(logger, menuRepository),
        },
      ],
      exports: [
        MenuFactoryModule.ADD_MENU,
        MenuFactoryModule.GET_MENUS,
        MenuFactoryModule.GET_MENU,
        MenuFactoryModule.DEL_MENU,
      ],
    };
  }
}
