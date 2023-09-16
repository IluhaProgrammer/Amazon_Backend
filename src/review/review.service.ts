import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { returnReview } from './dto/return.review';
import { ReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewService {

    constructor(private prisma : PrismaService) {}

    async getAverageValueByProductId(productId : number) {
        return this.prisma.review.aggregate({
            where: {productId},
            _avg: {raiting: true}
        }).then(data => data._avg)
    }

    async createReview(userId : number, dto : ReviewDto, productId : number) {
        const review = await this.prisma.review.create({
           data: {
                ...dto,
                product: {
                    connect: {
                        id: productId
                    }
                },
                user: {
                    connect: {
                        id: userId
                    }
                }
           }
        })

        return review
    }   

    async getAll() {
        const categories = await this.prisma.review.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                ...returnReview
            }
        })

        return categories
    }

}
