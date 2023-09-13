import { DynamicModule, Module } from '@nestjs/common';
import { LoggerModule } from 'src/infrastructure/logger/logger.module';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
import { DatabaseCategoryRepository } from 'src/infrastructure/repositories/category.repositories';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import {
  AddCategoriesUseCase,
  GetCategoriesUseCase,
  GetCategoryUseCase,
  UpdateCategoryUseCase,
} from '../category';

@Module({
  imports: [LoggerModule, RepositoriesModule],
})
export class CategoryFactoryModule {
  static ADD_CATEGORY = 'addCategory';
  static GET_ALL_CATEGORIES = 'getAllCategories';
  static GET_CATEGORY = 'getCategory';
  static PUT_CATEGORY = 'putCategory';

  static register(): DynamicModule {
    return {
      module: CategoryFactoryModule,
      providers: [
        {
          inject: [LoggerService, DatabaseCategoryRepository],
          provide: CategoryFactoryModule.ADD_CATEGORY,
          useFactory: (
            logger: LoggerService,
            categoryRepository: DatabaseCategoryRepository,
          ) => new AddCategoriesUseCase(logger, categoryRepository),
        },
        {
          inject: [LoggerService, DatabaseCategoryRepository],
          provide: CategoryFactoryModule.GET_ALL_CATEGORIES,
          useFactory: (
            logger: LoggerService,
            categoryRepository: DatabaseCategoryRepository,
          ) => new GetCategoriesUseCase(logger, categoryRepository),
        },
        {
          inject: [LoggerService, DatabaseCategoryRepository],
          provide: CategoryFactoryModule.GET_CATEGORY,
          useFactory: (
            logger: LoggerService,
            categoryRepository: DatabaseCategoryRepository,
          ) => new GetCategoryUseCase(logger, categoryRepository),
        },
        {
          inject: [LoggerService, DatabaseCategoryRepository],
          provide: CategoryFactoryModule.PUT_CATEGORY,
          useFactory: (
            logger: LoggerService,
            categoryRepository: DatabaseCategoryRepository,
          ) => new UpdateCategoryUseCase(logger, categoryRepository),
        },
      ],
      exports: [
        CategoryFactoryModule.ADD_CATEGORY,
        CategoryFactoryModule.GET_ALL_CATEGORIES,
        CategoryFactoryModule.GET_CATEGORY,
        CategoryFactoryModule.PUT_CATEGORY,
      ],
    };
  }
}
