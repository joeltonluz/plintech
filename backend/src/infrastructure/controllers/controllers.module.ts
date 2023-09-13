import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { CategoryFactoryModule } from 'src/usecases/factories/category-factory.module';
import { HealthController } from './health.controller';
import { CategoryController } from './category.controller';

@Module({
  imports: [TerminusModule, CategoryFactoryModule.register()],
  controllers: [HealthController, CategoryController],
  providers: [],
})
export class ControllersModule {}
