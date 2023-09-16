import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class StatisticService {

    constructor(private prisma : PrismaService, private user : UserService) {}

    async getMain(userId : number) {
        const user = await this.user.getProfile(userId, {
            orders: {
                select: {
                    items: true,

                }
            },
            reviews: true,

        })

        return [
            {
                name: "Orders",
                value: user.orders.length
            },
            {
                name: "Reviews",
                value: user.reviews.length
            },
            {
                name: "Favorites",
                vaue: user.favorites.length
            }
        ]
    }

}
