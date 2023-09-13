import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { DatabaseCategoryRepository } from './category.repositories';

@Module({
  imports: [DatabaseModule],
  providers: [DatabaseCategoryRepository],
  exports: [DatabaseCategoryRepository],
})
export class RepositoriesModule {}
