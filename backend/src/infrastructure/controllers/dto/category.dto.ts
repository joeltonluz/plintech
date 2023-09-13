import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';

export class CategoryDto {
  @IsObjectId()
  id: string;
  @IsNotEmpty({ message: 'name is required.' })
  name: string;
}

export class AddCategoryDto extends CategoryDto {
  @IsOptional()
  id: string;
}
