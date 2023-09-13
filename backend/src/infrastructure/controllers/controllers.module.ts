import { Module } from '@nestjs/common';
import { HealthController } from './health/health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { CategoryController } from './category/category.controller';
import { CategoryFactoryModule } from 'src/usecases/factories/category-factory.module';

@Module({
  imports: [TerminusModule, CategoryFactoryModule.register()],
  controllers: [HealthController, CategoryController],
  providers: [],
})
export class ControllersModule {}
