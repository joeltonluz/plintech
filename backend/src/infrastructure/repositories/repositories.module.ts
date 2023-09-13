import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { DatabaseCategoryRepository } from './category.repositories';
import { DatabaseProductRepository } from './product.repositories';
import { ExceptionsModule } from '../exceptions/exceptions.module';

@Module({
  imports: [DatabaseModule, ExceptionsModule],
  providers: [DatabaseCategoryRepository, DatabaseProductRepository],
  exports: [DatabaseCategoryRepository, DatabaseProductRepository],
})
export class RepositoriesModule {}
