import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateDto } from './dto/update.user.dto';
import { ReturnUser, returnFavorite } from './dto/return.user';
import { hash } from 'argon2';
import { Prisma } from '@prisma/client';
import { returnCategory } from 'src/category/dto/return.category';

@Injectable()
export class UserService {

    constructor(private prisma : PrismaService) {}

    async getProfile(id : number, selectodj : Prisma.UserSelect = {}) { 
        const user = await this.prisma.user.findUnique({
            where: {
                id
            },
            select: {
                ...ReturnUser,
                favorites: { 
                    select: {
                        ...returnFavorite,
                        category: {
                            select: {
                                ...returnCategory
                            }
                        },
                        reviews: true
                    }
                },
                ...selectodj
            }
        })

        if(!user) {
            throw new NotFoundException('User not found')
        }

        return user
    }
    
    async updateProfile(data : UpdateDto, id : number) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: data.email
            }
        })

        if(!user) {
            throw new BadRequestException('This email is already in use')
        }

        const updateUser = await this.prisma.user.update({
            where: {
                id
            },
            data: {
                email: data.email,
                name: data.name,
                avatarPath: data.avatarPath, 
                password: data.password,
                phone: data.password ? await hash(data.password) : user.password
            }
        })

        return updateUser


    }
    async toggleFavorites(productId : string, id : number) {
        const user = await this.prisma.user.findUnique({
            where: {
                id
            },
            select: {
                favorites: {
                    select: {
                        ...returnFavorite
                    }
                }
            }
        })

        if(!user) {
            throw new NotFoundException('User not found')
        }

        const isExist = user.favorites.some(product => product.id === +productId )

        await this.prisma.user.update({
            where: {
                id
            },
            data: {
                favorites: {
                    [isExist ? 'disconnect' : 'connect']: {
                        id: +productId
                    }
                }
            }
        })

        return {message: "Succes"} 
    }


}
