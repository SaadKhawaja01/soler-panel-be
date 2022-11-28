import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { Repository } from 'typeorm';
import { CreateProductsDto } from './dto/products.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async createProduct(
    createProductsDto: CreateProductsDto,
    user: User,
  ): Promise<Product> {
    const { ProductName, barcode, price, quantity } = createProductsDto;

    const product = this.productsRepository.create({
      ProductName,
      barcode,
      price,
      quantity,
      user,
    });

    await this.productsRepository.save(product);

    return product;
  }

  async getProducts(user: User): Promise<Product[]> {
    // const { ProductName, barcode, price, quantity } = createProductsDto;
    const query = this.productsRepository.createQueryBuilder('product');
    query.where({ user });
    const tasks = await query.getMany();
    return tasks;
  }

  async getProductsById(id: string): Promise<Product> {
    const found = await this.productsRepository.findOne({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException('Task with id ' + id + ' not found');
    }
    return found;
  }

  async DeleteProduct(id: string): Promise<string> {
    const result = await this.productsRepository.delete({ id});
    if (result.affected === 0) {
      throw new NotFoundException('Task with id ' + id + ' not found');
    }
    return `your product was successfully deleted`;
  }

  async UpdateProductPrice(
    id: string,
    price: number,
  ): Promise<Product> {
    const FoundProduct = await this.getProductsById(id);
    FoundProduct.price = price;
    await this.productsRepository.save(FoundProduct);
    return FoundProduct;
  }
}
