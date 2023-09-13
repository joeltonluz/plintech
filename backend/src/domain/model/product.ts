import { MenuM } from './menu';

export class ProductM {
  id: string;
  name: string;
  price: string;
  image?: string; //base64?
  description: string;
  categoryId: string;
  menu?: MenuM[];
}
