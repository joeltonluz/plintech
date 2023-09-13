import { MenuM } from '../model';

export interface MenuRepository {
  insert(menu: MenuM): Promise<MenuM>;
  findAll(): Promise<MenuM[]>;
  findById(id: string): Promise<MenuM>;
  updateContent(menu: Omit<MenuM, 'period'>): Promise<MenuM>;
  deleteById(id: string): Promise<void>;
}
