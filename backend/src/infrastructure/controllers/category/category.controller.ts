import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import {
  GetCategoriesUseCase,
  GetCategoryUseCase,
} from 'src/usecases/category';
// import { GetCategoriesUseCase } from 'src/usecases/category/getCategories.usecase';
//  import { GetCategoryUseCase } from 'src/usecases/category/getCategory.usecase';
import { CategoryFactoryModule } from 'src/usecases/factories/category-factory.module';

type CategoryDto = {
  id: string;
  name: string;
};

type AddCategoryDto = Omit<CategoryDto, 'id'>;
@Controller('category')
export class CategoryController {
  constructor(
    // @Inject(CategoryFactoryModule.ADD_CATEGORY)
    // private readonly addCategory: AddCategoriesUseCase,
    @Inject(CategoryFactoryModule.GET_ALL_CATEGORIES)
    private readonly getCategories: GetCategoriesUseCase,
    @Inject(CategoryFactoryModule.GET_CATEGORY)
    private readonly getCategory: GetCategoryUseCase,
  ) {}

  // @Post()
  // async AddCategory(@Body() categoryDto: AddCategoryDto) {
  //   const result = await this.addCategory.execute(categoryDto);
  //   return result;
  // }

  @Get()
  async getAllCategories() {
    const result = await this.getCategories.execute();

    return result;
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async GetCategory(@Param('id') id: string) {
    return await this.getCategory.execute(id);
  }
}
