import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CategoryDto {
  @IsUUID()
  id: string;
  @IsNotEmpty({ message: 'name is required.' })
  name: string;
}

export class AddCategoryDto extends CategoryDto {
  @IsOptional()
  id: string;
}
