import { DynamicModule, Module } from '@nestjs/common';
import { LoggerModule } from 'src/infrastructure/logger/logger.module';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
import { DatabaseCategoryRepository } from 'src/infrastructure/repositories/category.repositories';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { GetCategoriesUseCase } from '../category/getCategories.usecase';

@Module({
  imports: [LoggerModule, RepositoriesModule],
})
export class CategoryFactoryModule {
  static GET_ALL_CATEGORIES = 'getAllCategories';

  static register(): DynamicModule {
    return {
      module: CategoryFactoryModule,
      providers: [
        {
          inject: [LoggerService, DatabaseCategoryRepository],
          provide: CategoryFactoryModule.GET_ALL_CATEGORIES,
          useFactory: (
            logger: LoggerService,
            categoryRepository: DatabaseCategoryRepository,
          ) => new GetCategoriesUseCase(logger, categoryRepository),
        },
      ],
      exports: [CategoryFactoryModule.GET_ALL_CATEGORIES],
    };
  }
}
