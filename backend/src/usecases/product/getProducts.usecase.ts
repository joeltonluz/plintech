import { ILogger } from 'src/domain/logger';
import { ProductM } from 'src/domain/model';
import { ProductRepository } from 'src/domain/repositories';

export class GetProductsUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(): Promise<ProductM[]> {
    this.logger.log('Product UseCase', `Finding all Products`);
    return await this.productRepository.findAll();
  }
}
