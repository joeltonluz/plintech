import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ProductFactoryModule } from 'src/usecases/factories/product-factory.module';
import { GetProductUseCase } from 'src/usecases/product';
import { GetProductsUseCase } from 'src/usecases/product/getProducts.usecase';

@Controller('product')
export class ProductController {
  constructor(
    @Inject(ProductFactoryModule.GET_PRODUCTS)
    private readonly getProductsUc: GetProductsUseCase,
    @Inject(ProductFactoryModule.GET_PRODUCT)
    private readonly getProductUc: GetProductUseCase,
  ) {}

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
