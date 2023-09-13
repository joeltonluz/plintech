import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ProductFactoryModule } from 'src/usecases/factories/product-factory.module';
import { AddProductUseCase, GetProductUseCase } from 'src/usecases/product';
import { GetProductsUseCase } from 'src/usecases/product/getProducts.usecase';
import { AddProductDto } from './dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(
    @Inject(ProductFactoryModule.ADD_PRODUCT)
    private readonly addProductUc: AddProductUseCase,
    @Inject(ProductFactoryModule.GET_PRODUCTS)
    private readonly getProductsUc: GetProductsUseCase,
    @Inject(ProductFactoryModule.GET_PRODUCT)
    private readonly getProductUc: GetProductUseCase,
  ) {}

  @Post()
  async addProduct(@Body() productDto: AddProductDto) {
    const result = await this.addProductUc.execute(productDto);

    return result;
  }

  @Get()
  async getProducts() {
    const result = await this.getProductsUc.execute();

    return result;
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    const result = await this.getProductUc.execute(id);

    return result;
  }
}
