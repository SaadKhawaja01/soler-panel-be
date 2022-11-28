import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { ClientDto } from './dto/client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  async createClient(clientDto: ClientDto, user: User): Promise<Client> {
    const { ClientName, Email, PhoneNo, Balance } = clientDto;

    const Client = this.clientsRepository.create({
      ClientName,
      Email,
      PhoneNo,
      Balance,
      user,
    });

    await this.clientsRepository.save(Client);

    return Client;
  }

  async getClients(user: User): Promise<Client[]> {
    const query = this.clientsRepository.createQueryBuilder('Client');
    query.where({ user });
    const tasks = await query.getMany();
    return tasks;
  }

  async getClientsById(id: string): Promise<Client> {
    const found = await this.clientsRepository.findOne({
      where: { id },
    });
    // const found = await this.ClientsRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException('Task with id ' + id + ' not found');
    }
    return found;
  }

  async DeleteClient(id: string): Promise<string> {
    const result = await this.clientsRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Task with id ' + id + ' not found');
    }
    return `your Client was successfully deleted`;
  }

  async UpdateClientPrice(id: string, balance: number): Promise<Client> {
    const FoundClient = await this.getClientsById(id);
    FoundClient.Balance = balance;
    await this.clientsRepository.save(FoundClient);
    return FoundClient;
  }
}
