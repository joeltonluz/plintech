import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsOptional,
  IsUUID,
} from 'class-validator';
enum PeriodMenu {
  'DAY',
  'NIGHT',
}

export class MenuDto {
  @IsUUID()
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
