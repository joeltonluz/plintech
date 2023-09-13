import { ILogger } from 'src/domain/logger';
import { ProductRepository } from 'src/domain/repositories';

export class DeleteProductUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(id: string): Promise<void> {
    this.logger.log('Product UseCase', `Deleting a Product ${id} `);
    await this.productRepository.deleteById(id);
    return;
  }
}
