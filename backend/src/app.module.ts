import { Module } from '@nestjs/common';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { CategoryFactoryModule } from './usecases/factories/category-factory.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';

@Module({
  imports: [
    LoggerModule,
    ExceptionsModule,
    ControllersModule,
    CategoryFactoryModule.register(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
