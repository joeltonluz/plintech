import { CategoryM } from '../model';

export interface CategoryRepository {
  //insert(category: CategoryM): Promise<CategoryM>;
  findAll(): Promise<CategoryM[]>;
  findById(id: string): Promise<CategoryM>;
}
