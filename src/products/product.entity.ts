import { User } from '../auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity() // it tells app.module typeOrm/DB that these are entities.
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  ProductName: string;

  @ApiProperty()
  @Column({ nullable: true })
  barcode: string;

  @ApiProperty()
  @Column()
  price: number;
  
  @ApiProperty()
  @Column()
  quantity: number;

  @ManyToOne((_type) => User, (user) => user.Products, { eager: false })
  @Exclude({ toPlainOnly: true }) // when print it exclude user property
  user: User;
}
