import { ILogger } from 'src/domain/logger';
import { CategoryM } from 'src/domain/model';
import { CategoryRepository } from 'src/domain/repositories';

export class GetCategoryUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(id: string): Promise<CategoryM> {
    this.logger.log('Category', 'Find By Id');
    return await this.categoryRepository.findById(id);
  }
}
