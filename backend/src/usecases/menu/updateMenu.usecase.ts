import { ILogger } from 'src/domain/logger';
import { MenuM } from 'src/domain/model';
import { MenuRepository } from 'src/domain/repositories';

export class UpdateMenuUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly menuRepository: MenuRepository,
  ) {}

  async execute(menu: Omit<MenuM, 'period'>): Promise<MenuM> {
    this.logger.log('Menu UseCase', `Updating a Menu`);
    return await this.menuRepository.updateContent(menu);
  }
}
