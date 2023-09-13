import { CategoryM } from '../model';

export interface CategoryRepository {
  //insert(todo: CategoryM): Promise<CategoryM>;
  findAll(): Promise<CategoryM[]>;
  // findById(id: string): Promise<CategoryM>;
}
