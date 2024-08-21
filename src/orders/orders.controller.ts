import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ORDER_SERVICE } from 'src/config';
import { CreateOrderDto } from './dto/create-order.dto';
import { catchError } from 'rxjs';
import { OrderPaginationDto, StatusDto } from './dto';
import { PaginationDto } from 'src/common';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(ORDER_SERVICE) private readonly clientOrders: ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.clientOrders.send({ cmd: 'create_order' }, createOrderDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      })
    );
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.clientOrders.send({ cmd: 'find_all_orders' }, orderPaginationDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      })
    );
  }

  @Get(':status')
  findAllByStatus(@Param() statusDto: StatusDto, @Query() paginationDto: PaginationDto) {
    return this.clientOrders
      .send({ cmd: 'find_all_orders' }, { ...paginationDto, status: statusDto.status })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        })
      );
  }

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.clientOrders.send({ cmd: 'find_one_order' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      })
    );
  }

  @Patch(':id')
  changeOrderStatus(@Param('id', ParseUUIDPipe) id: string, @Body() statusDto: StatusDto) {
    return this.clientOrders
      .send({ cmd: 'change_order_status' }, { id, status: statusDto.status })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        })
      );
  }
}
