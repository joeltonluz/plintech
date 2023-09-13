import { ILogger } from 'src/domain/logger';
import { CategoryRepository } from 'src/domain/repositories';

export class DeleteCategoryUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(id: string): Promise<void> {
    this.logger.log('Category UseCase', `Deleting a Category ${id} `);
    return await this.categoryRepository.deleteById(id);
  }
}
