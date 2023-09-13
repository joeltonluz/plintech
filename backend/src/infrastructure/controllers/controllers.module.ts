import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { CategoryFactoryModule } from 'src/usecases/factories/category-factory.module';
import { HealthController } from './health.controller';
import { CategoryController } from './category.controller';
import { ProductController } from './product.controller';
import { ProductFactoryModule } from 'src/usecases/factories/product-factory.module';
import { MenuFactoryModule } from 'src/usecases/factories/menu-factory.module';
import { MenuController } from './menu.controller';

@Module({
  imports: [
    TerminusModule,
    CategoryFactoryModule.register(),
    ProductFactoryModule.register(),
    MenuFactoryModule.register(),
  ],
  controllers: [
    HealthController,
    CategoryController,
    ProductController,
    MenuController,
  ],
  providers: [],
})
export class ControllersModule {}
