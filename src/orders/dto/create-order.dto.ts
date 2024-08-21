import { IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus, OrderStatusList } from '../enum/order.enum';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  totalAmount: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  totalItems: number;

  @IsEnum(OrderStatusList, {
    message: `Possible status values are ${OrderStatusList.join(', ')}`
  })
  @IsOptional()
  status: OrderStatus = OrderStatus.PENDING;
}
