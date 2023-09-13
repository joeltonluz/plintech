import { DynamicModule, Module } from '@nestjs/common';
import { LoggerModule } from 'src/infrastructure/logger/logger.module';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
import { DatabaseMenuRepository } from 'src/infrastructure/repositories/menu.repositories';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { GetMenusUseCase } from '../menu/getMenus.usecase';

@Module({
  imports: [LoggerModule, RepositoriesModule],
})
export class MenuFactoryModule {
  static GET_MENUS = 'getMenus';

  static register(): DynamicModule {
    return {
      module: MenuFactoryModule,
      providers: [
        {
          inject: [LoggerService, DatabaseMenuRepository],
          provide: MenuFactoryModule.GET_MENUS,
          useFactory: (
            logger: LoggerService,
            menuRepository: DatabaseMenuRepository,
          ) => new GetMenusUseCase(logger, menuRepository),
        },
      ],
      exports: [MenuFactoryModule.GET_MENUS],
    };
  }
}
