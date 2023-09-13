import { ILogger } from 'src/domain/logger';
import { ProductM } from 'src/domain/model';
import { ProductRepository } from 'src/domain/repositories';

export class AddProductUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(product: ProductM): Promise<ProductM> {
    this.logger.log('Product UseCase', 'Inserting a new Product');
    return await this.productRepository.insert(product);
  }
}
