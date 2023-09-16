import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { OrderService } from './order.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { OrderDto } from './dto/order.dto';
import { UsePipes } from '@nestjs/common';
import {ValidationPipe} from '@nestjs/common/pipes'

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getAllOrders(@CurrentUser('id') id : number) {
    return this.orderService.getAll(id)
  } 

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/place-order')
  placeOrder(@CurrentUser('id') id : number, @Body() dto : OrderDto ) {
    return this.orderService.placeOrder(dto, id)
  }
}
