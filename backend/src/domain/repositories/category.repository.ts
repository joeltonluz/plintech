import { CategoryM } from '../model';

export interface CategoryRepository {
  insert(name: string): Promise<CategoryM>;
  findAll(): Promise<CategoryM[]>;
  findById(id: string): Promise<CategoryM>;
  updateContent(id: string, name: string): Promise<CategoryM>;
  deleteById(id: string): Promise<void>;
}
