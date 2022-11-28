import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { OrderDto } from './dto/orders.dto';
import { Order } from './order.entity';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
@UseGuards(AuthGuard()) // to protect entire route with jwt
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  createOrder(
    @Body() orderDto: OrderDto,
    @GetUser() user: User, //user own the task
  ): Promise<Order> {
    return this.ordersService.createOrder(orderDto, user);
  }

  @Get()
  async getOrders(@GetUser() user: User): //user own the task
  Promise<Order[]> {
    return this.ordersService.getOrders(user);
  }

  @Get('/:id')
  getOrdersById(@Param('id') id: string): Promise<Order> {
    return this.ordersService.getOrdersById(id);
  }

  @Delete('/:id')
  DeleteOrder(@Param('id') id: string): Promise<string> {
    return this.ordersService.DeleteOrder(id);
  }
}
