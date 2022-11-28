import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IProduct } from '../Product.Interface';

export class OrderDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  clientId: string;

  @IsNotEmpty()
  @ApiProperty({
    default: [
      {
        productId: '',
        productQty: 0,
      },
    ],
  })
  @IsString()
  products: IProduct[];
}
