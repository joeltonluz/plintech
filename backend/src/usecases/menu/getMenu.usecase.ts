import { ILogger } from 'src/domain/logger';
import { MenuM } from 'src/domain/model';
import { MenuRepository } from 'src/domain/repositories';

export class GetMenuUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly menuRepository: MenuRepository,
  ) {}

  async execute(id: string): Promise<MenuM> {
    this.logger.log('Menu UseCase', `Finding a Menu`);
    return await this.menuRepository.findById(id);
  }
}
