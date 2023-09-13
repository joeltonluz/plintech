import { ILogger } from 'src/domain/logger';
import { ProductM } from 'src/domain/model';
import { ProductRepository } from 'src/domain/repositories';

export class GetProductUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(id: string): Promise<ProductM> {
    this.logger.log('Product UseCase', `Finding a Product ${id} `);
    return await this.productRepository.findById(id);
  }
}
