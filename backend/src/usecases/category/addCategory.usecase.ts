import { ILogger } from 'src/domain/logger';
import { CategoryM } from 'src/domain/model';
import { CategoryRepository } from 'src/domain/repositories';

export class AddCategoriesUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(name: string): Promise<CategoryM> {
    this.logger.log('Add UseCase', 'Inserting a new Category');
    return await this.categoryRepository.insert(name);
  }
}
