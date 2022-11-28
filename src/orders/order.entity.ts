import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { User } from '../auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IProduct } from './Product.Interface';

@Entity() // it tells app.module typeOrm/DB that these are entities.
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  clientId: string;

  @ApiProperty()
  // @Column('simple-json', { array: true })
  @Column('jsonb')
  Products: IProduct[];

  @ManyToOne((_type) => User, (user) => user.Orders, { eager: false })
  @Exclude({ toPlainOnly: true }) // when print it exclude user property
  user: User;
}
