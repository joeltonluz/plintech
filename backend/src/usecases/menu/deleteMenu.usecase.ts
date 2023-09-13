import { ILogger } from 'src/domain/logger';
import { MenuRepository } from 'src/domain/repositories';

export class DeleteMenuUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly menuRepository: MenuRepository,
  ) {}

  async execute(id: string): Promise<void> {
    this.logger.log('Menu UseCase', `Deleting a Menu`);
    await this.menuRepository.deleteById(id);
    return;
  }
}
