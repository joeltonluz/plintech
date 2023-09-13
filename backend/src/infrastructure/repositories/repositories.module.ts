import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { DatabaseCategoryRepository } from './category.repositories';
import { DatabaseProductRepository } from './product.repositories';

@Module({
  imports: [DatabaseModule],
  providers: [DatabaseCategoryRepository, DatabaseProductRepository],
  exports: [DatabaseCategoryRepository, DatabaseProductRepository],
})
export class RepositoriesModule {}
