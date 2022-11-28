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
import { Client } from './client.entity';
import { ClientsService } from './clients.service';
import { ClientDto } from './dto/client.dto';

@ApiTags('clients')
@ApiBearerAuth()
@Controller('clients')
@UseGuards(AuthGuard()) // to protect entire route with jwt
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Post()
  createClient(
    @Body() clientDto: ClientDto,
    @GetUser() user: User, //user own the task
  ): Promise<Client> {
    return this.clientsService.createClient(clientDto, user);
  }

  @Get()
  async getClients(
    @GetUser() user: User, //user own the task
  ): Promise<Client[]> {
    return this.clientsService.getClients( user);
  }

  @Get('/:id')
  getClientsById(
    @Param('id') id: string,
  ): Promise<Client> {
    return this.clientsService.getClientsById(id);
  }

  @Delete('/:id')
  DeleteClient(
    @Param('id') id: string,
  ): Promise<string> {
    return this.clientsService.DeleteClient(id);
  }

  @Patch('/:id/balance')
  UpdateClientPrice(
    @Param('id') id: string,
    @Body() clientDto: ClientDto,
  ): Promise<Client> {
    const { Balance } = clientDto;
    return this.clientsService.UpdateClientPrice(id, Balance);
  }
}
