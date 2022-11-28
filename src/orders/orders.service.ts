import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { Repository } from 'typeorm';
import { OrderDto } from './dto/orders.dto';
import { Order } from './order.entity';
import { IProduct } from './Product.Interface';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async createOrder(orderDto: OrderDto, user: User): Promise<Order> {
    const { clientId, products } = orderDto;

    const order = this.orderRepository.create({
      clientId,
      Products: products,
      user,
    });

    await this.orderRepository.save(order);

    return order;
  }

  async getOrders(user: User): Promise<Order[]> {
    const query = this.orderRepository.createQueryBuilder('order');
    query.where({ user });
    const orders = await query.getMany();
    return orders;
  }

  async getOrdersById(id: string): Promise<Order> {
    const found = await this.orderRepository.findOne({
      where: { id},
    });
    
    if (!found) {
      throw new NotFoundException('Order with id ' + id + ' not found');
    }
    return found;
  }

  async DeleteOrder(id: string): Promise<string> {
    const result = await this.orderRepository.delete({ id});
    if (result.affected === 0) {
      throw new NotFoundException('Task with id ' + id + ' not found');
    }
    return `your order was successfully deleted`;
  }
}
