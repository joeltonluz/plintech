import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductFactoryModule } from 'src/usecases/factories/product-factory.module';
import {
  AddProductUseCase,
  DeleteProductUseCase,
  GetProductUseCase,
} from 'src/usecases/product';
import { GetProductsUseCase } from 'src/usecases/product/getProducts.usecase';
import { AddProductDto } from './dto/product.dto';
import { UpdateProductUseCase } from 'src/usecases/product/updateProduct.usecase';

@Controller('product')
export class ProductController {
  constructor(
    @Inject(ProductFactoryModule.ADD_PRODUCT)
    private readonly addProductUc: AddProductUseCase,
    @Inject(ProductFactoryModule.GET_PRODUCTS)
    private readonly getProductsUc: GetProductsUseCase,
    @Inject(ProductFactoryModule.GET_PRODUCT)
    private readonly getProductUc: GetProductUseCase,
    @Inject(ProductFactoryModule.PUT_PRODUCT)
    private readonly updateProductUc: UpdateProductUseCase,
    @Inject(ProductFactoryModule.DEL_PRODUCT)
    private readonly deleteProductUc: DeleteProductUseCase,
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

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() productDto: AddProductDto,
  ) {
    productDto.id = id;
    const result = await this.updateProductUc.execute(productDto);

    return result;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.deleteProductUc.execute(id);
  }
}
