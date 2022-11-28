import { User } from '../auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity() // it tells app.module typeOrm/DB that these are entities.
export class Client {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  ClientName: string;

  @ApiProperty()
  @Column({ nullable: true })
  Email: string;

  @ApiProperty()
  @Column()
  PhoneNo: string;

  @ApiProperty()
  @Column()
  Balance: number;

  @ManyToOne((_type) => User, (user) => user.Products, { eager: false })
  @Exclude({ toPlainOnly: true }) // when print it exclude user property
  user: User;
}
