import { Controller, Get, Inject } from '@nestjs/common';
import { CategoryGetAll } from 'src/usecases/category/category-get-all';
import { CategoryFactoryModule } from 'src/usecases/factories/category-factory.module';

@Controller('category')
export class CategoryController {
  constructor(
    @Inject(CategoryFactoryModule.GET_ALL_CATEGORIES)
    private readonly getCategories: CategoryGetAll,
  ) {}

  @Get()
  async getAllCategories() {
    const result = await this.getCategories.execute();

    return result;
  }
}
