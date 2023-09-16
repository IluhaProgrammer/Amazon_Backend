import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { OrderDto } from './dto/order.dto';
import * as YooKassa from 'yookassa'

const yookassa = new YooKassa({
    shopId: process.env['SHOP_ID'],
    secretKey: process.env['SECRET_TOKEN']
})

@Injectable()
export class OrderService {

    constructor(private prisma : PrismaService) {}

    async getAll(userId : number) {
        const orders = await this.prisma.order.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: 'desc' 
            }
        })

        return orders
    }

    async placeOrder(dto : OrderDto, userId: number) {
        const order = await this.prisma.order.create({
            data: {
                status: dto.status,
                items: {
                    create: dto.items
                },
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        })

        const payment = await yoo

        return order
    }

}
