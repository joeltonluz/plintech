import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';
enum PeriodMenu {
  'DAY',
  'NIGHT',
}

export class MenuDto {
  @IsObjectId({ message: 'id must be a objectId format' })
  id: string;

  @IsEnum(PeriodMenu, { message: ' Period must be DAY or NIGHT' })
  period: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'Must have minimum one product' })
  products?: string[];
}

export class AddMenuDto extends MenuDto {
  @IsOptional()
  id: string;
}

export class ProductsMenuDto {
  // @IsObjectId({ message: 'id must be a objectId format' })
  id: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'Must have minimum one product' })
  products: string[];
}
