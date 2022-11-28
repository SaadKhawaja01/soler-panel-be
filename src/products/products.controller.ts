import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateProductsDto } from './dto/products.dto';
import { Product } from './product.entity';
import { ProductsService } from './products.service';

@ApiTags('products')
@ApiBearerAuth()
@Controller('products')
@UseGuards(AuthGuard()) // to protect entire route with jwt
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  createProduct(
    @Body() createProductsDto: CreateProductsDto,
    @GetUser() user: User, //user own the task
  ): Promise<Product> {
    return this.productsService.createProduct(createProductsDto, user);
  }

  @Get()
  async getProducts(
    @GetUser() user: User, //user own the task
  ): Promise<Product[]> {
    return this.productsService.getProducts(user);
  }

  @Get('/:id')
  getProductsById(@Param('id') id: string): Promise<Product> {
    return this.productsService.getProductsById(id);
  }

  @Delete('/:id')
  DeleteProduct(@Param('id') id: string): Promise<string> {
    return this.productsService.DeleteProduct(id);
  }

  @Patch('/:id/price')
  UpdateProductPrice(
    @Param('id') id: string,
    @Body() createProductsDto: CreateProductsDto,
  ): Promise<Product> {
    const { price } = createProductsDto;
    return this.productsService.UpdateProductPrice(id, price);
  }
}
