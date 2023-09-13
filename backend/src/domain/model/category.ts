import { Optional } from './optional-type';

export class CategoryM {
  id: string;
  name: string;

  private constructor(props: CategoryM) {
    this.id = props.id ? props.id : crypto.randomUUID();
    this.name = props.name;
  }
}
