import { Product } from '../products/product.entity';
import { Client } from '../clients/client.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../orders/order.entity';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  username: string;

  @ApiProperty()
  @Column()
  password: string;
  // eager  mean  when we fetch user it will automatically fetch products from db
  @OneToMany((_type) => Product, (product) => product.user, { eager: true })
  Products: Product[];

  @OneToMany((_type) => Client, (client) => client.user, { eager: true })
  Clients: Client[];

  @OneToMany((_type) => Order, (order) => order.user, { eager: true })
  Orders: Order[];
}
