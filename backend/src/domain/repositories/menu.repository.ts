import { MenuM } from '../model';

export interface MenuRepository {
  //insert(name: string): Promise<MenuM>;
  findAll(): Promise<MenuM[]>;
  //findById(id: string): Promise<MenuM>;
  //updateContent(id: string, name: string): Promise<MenuM>;
  //deleteById(id: string): Promise<void>;
}
