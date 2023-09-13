import { DynamicModule, Module } from '@nestjs/common';
import { LoggerModule } from 'src/infrastructure/logger/logger.module';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
import { DatabaseProductRepository } from 'src/infrastructure/repositories/product.repositories';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { GetProductUseCase, GetProductsUseCase } from '../product';

@Module({
  imports: [LoggerModule, RepositoriesModule],
})
export class ProductFactoryModule {
  static GET_PRODUCTS = 'getProducts';
  static GET_PRODUCT = 'getProduct';

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
        {
          inject: [LoggerService, DatabaseProductRepository],
          provide: ProductFactoryModule.GET_PRODUCT,
          useFactory: (
            logger: LoggerService,
            productRepository: DatabaseProductRepository,
          ) => new GetProductUseCase(logger, productRepository),
        },
      ],
      exports: [
        ProductFactoryModule.GET_PRODUCTS,
        ProductFactoryModule.GET_PRODUCT,
      ],
    };
  }
}
