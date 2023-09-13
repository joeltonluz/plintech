import { ProductM } from '../model';

export interface ProductRepository {
  //insert(product: ProductM): Promise<ProductM>;
  findAll(): Promise<ProductM[]>;
  findById(id: string): Promise<ProductM>;
  // updateContent(id: number, isDone: boolean): Promise<void>;
  // deleteById(id: number): Promise<void>;
}
