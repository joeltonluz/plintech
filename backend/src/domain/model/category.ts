import { Optional } from './optional-type';
import { ProductM } from './product';

export class CategoryM {
  id: string;
  name: string;
  products?: ProductM[];
}
