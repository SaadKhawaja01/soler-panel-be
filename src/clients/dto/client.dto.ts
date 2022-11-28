import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ClientDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  ClientName: string;

  @IsString()
  @ApiProperty()
  Email: string;

  @IsString()
  @ApiProperty()
  PhoneNo: string;

  @ApiProperty()
  @IsNotEmpty()
  Balance: number;
}
