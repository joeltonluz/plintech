import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { CategoryFactoryModule } from 'src/usecases/factories/category-factory.module';
import { HealthController } from './health.controller';
import { CategoryController } from './category.controller';
import { ProductController } from './product.controller';
import { ProductFactoryModule } from 'src/usecases/factories/product-factory.module';

@Module({
  imports: [
    TerminusModule,
    CategoryFactoryModule.register(),
    ProductFactoryModule.register(),
  ],
  controllers: [HealthController, CategoryController, ProductController],
  providers: [],
})
export class ControllersModule {}
