import { Controller, Get, Inject } from '@nestjs/common';
import { GetCategoriesUseCase } from 'src/usecases/category/getCategories.usecase';
import { CategoryFactoryModule } from 'src/usecases/factories/category-factory.module';

@Controller('category')
export class CategoryController {
  constructor(
    @Inject(CategoryFactoryModule.GET_ALL_CATEGORIES)
    private readonly getCategories: GetCategoriesUseCase,
  ) {}

  @Get()
  async getAllCategories() {
    const result = await this.getCategories.execute();

    return result;
  }
}
