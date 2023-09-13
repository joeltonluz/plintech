import { Controller, Get, Inject } from '@nestjs/common';
import { ProductFactoryModule } from 'src/usecases/factories/product-factory.module';
import { GetProductsUseCase } from 'src/usecases/product/getProducts.usecase';

@Controller('product')
export class ProductController {
  constructor(
    @Inject(ProductFactoryModule.GET_PRODUCTS)
    private readonly getProductsUc: GetProductsUseCase,
  ) {}

  @Get()
  async getProducts() {
    const result = await this.getProductsUc.execute();

    return result;
  }
}
