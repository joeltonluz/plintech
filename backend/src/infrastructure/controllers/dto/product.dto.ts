import { IsNotEmpty, IsOptional, IsUUID, Validate } from 'class-validator';
import { IsValidPrice } from 'src/infrastructure/common/decorators/is-valid-price';

export class ProductDto {
  @IsUUID()
  id: string;
  @IsNotEmpty({ message: 'name is required' })
  name: string;
  @Validate(IsValidPrice)
  price: string;
  @IsOptional()
  image?: string; //base64?
  @IsNotEmpty({ message: 'description is required' })
  description: string;
  @IsNotEmpty({ message: 'categoryId is required' })
  categoryId: string;
}

export class AddProductDto extends ProductDto {
  @IsOptional()
  id: string;
}
