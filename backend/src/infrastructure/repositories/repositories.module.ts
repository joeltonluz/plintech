import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { DatabaseCategoryRepository } from './category.repositories';
import { DatabaseProductRepository } from './product.repositories';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { DatabaseMenuRepository } from './menu.repositories';

@Module({
  imports: [DatabaseModule, ExceptionsModule],
  providers: [
    DatabaseCategoryRepository,
    DatabaseProductRepository,
    DatabaseMenuRepository,
  ],
  exports: [
    DatabaseCategoryRepository,
    DatabaseProductRepository,
    DatabaseMenuRepository,
  ],
})
export class RepositoriesModule {}
