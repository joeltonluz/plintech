import { ILogger } from 'src/domain/logger';
import { CategoryM } from 'src/domain/model';
import { CategoryRepository } from 'src/domain/repositories';

export class GetCategoriesUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(): Promise<CategoryM[]> {
    this.logger.log('FindAll UseCase', `Finding all Categories`);
    return await this.categoryRepository.findAll();
  }
}
