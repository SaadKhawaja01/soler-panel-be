import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductsDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  ProductName: string;

  @ApiProperty()
  barcode: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  quantity: number;
}
