import { ILogger } from 'src/domain/logger';
import { MenuM } from 'src/domain/model';
import { MenuRepository } from 'src/domain/repositories';

export class GetMenusUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly menuRepository: MenuRepository,
  ) {}

  async execute(): Promise<MenuM[]> {
    this.logger.log('Menu UseCase', `Finding all Menus`);
    return await this.menuRepository.find();
  }
}
