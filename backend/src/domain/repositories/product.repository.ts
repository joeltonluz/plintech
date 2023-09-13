import { ProductM } from '../model';

export interface ProductRepository {
  insert(product: ProductM): Promise<ProductM>;
  findAll(): Promise<ProductM[]>;
  findById(id: string): Promise<ProductM>;
  updateContent(product: ProductM): Promise<ProductM>;
  deleteById(id: string): Promise<void>;
}
