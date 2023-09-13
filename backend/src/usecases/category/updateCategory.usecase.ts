import { ILogger } from 'src/domain/logger';
import { CategoryM } from 'src/domain/model';
import { CategoryRepository } from 'src/domain/repositories';

export class UpdateCategoryUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(id: string, name: string): Promise<CategoryM> {
    return await this.categoryRepository.updateContent(id, name);
  }
}
