import { DynamicModule, Module } from '@nestjs/common';
import { LoggerModule } from 'src/infrastructure/logger/logger.module';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
import { DatabaseProductRepository } from 'src/infrastructure/repositories/product.repositories';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { GetProductsUseCase } from '../product/getProducts.usecase';

@Module({
  imports: [LoggerModule, RepositoriesModule],
})
export class ProductFactoryModule {
  static GET_PRODUCTS = 'getProducts';

  static register(): DynamicModule {
    return {
      module: ProductFactoryModule,
      providers: [
        {
          inject: [LoggerService, DatabaseProductRepository],
          provide: ProductFactoryModule.GET_PRODUCTS,
          useFactory: (
            logger: LoggerService,
            productRepository: DatabaseProductRepository,
          ) => new GetProductsUseCase(logger, productRepository),
        },
      ],
      exports: [ProductFactoryModule.GET_PRODUCTS],
    };
  }
}
