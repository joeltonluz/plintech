import { ILogger } from 'src/domain/logger';
import { MenuM } from 'src/domain/model';
import { MenuRepository } from 'src/domain/repositories';

export class AddMenuUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly menuRepository: MenuRepository,
  ) {}

  async execute(menu: MenuM): Promise<MenuM> {
    this.logger.log('Menu UseCase', `Inserting new Menu`);
    return await this.menuRepository.insert(menu);
  }
}
