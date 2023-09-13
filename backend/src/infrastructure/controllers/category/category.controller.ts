import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  AddCategoriesUseCase,
  GetCategoriesUseCase,
  GetCategoryUseCase,
  UpdateCategoryUseCase,
} from 'src/usecases/category';
import { CategoryFactoryModule } from 'src/usecases/factories/category-factory.module';

type CategoryDto = {
  id: string;
  name: string;
};

type AddCategoryDto = Omit<CategoryDto, 'id'>;
@Controller('category')
export class CategoryController {
  constructor(
    @Inject(CategoryFactoryModule.ADD_CATEGORY)
    private readonly addCategory: AddCategoriesUseCase,
    @Inject(CategoryFactoryModule.GET_ALL_CATEGORIES)
    private readonly getCategories: GetCategoriesUseCase,
    @Inject(CategoryFactoryModule.GET_CATEGORY)
    private readonly getCategory: GetCategoryUseCase,
    @Inject(CategoryFactoryModule.PUT_CATEGORY)
    private readonly updateCategory: UpdateCategoryUseCase,
  ) {}

  @Post()
  async PostCategory(@Body() categoryDto: AddCategoryDto) {
    const result = await this.addCategory.execute(categoryDto.name);
    return result;
  }

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

  @Put(':id')
  async PutCategory(@Param('id') id: string, @Body() categoryDto: CategoryDto) {
    const result = this.updateCategory.execute(id, categoryDto.name);
    return result;
  }
}
