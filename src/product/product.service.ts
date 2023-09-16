import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { returnProduct, returnProductObjFulliest } from './dto/return.product';
import { ProductDto } from './dto/product.dto';
import { returnCategory } from 'src/category/dto/return.category';
import { generateSlug } from 'src/utils/generator.slug';
import { EnumProductSort, GetAllProductDto } from './dto/filter.product.dto';
import { PaginationService } from 'src/pagination/pagination.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {

    constructor(private prisma : PrismaService, private pagination : PaginationService) {} 

    async getAllProducts(dto : GetAllProductDto) {
        const {sort, searchTerm} = dto

        const prismaSort : Prisma.ProductOrderByWithRelationInput[] = []

        if(sort === EnumProductSort.LOW_PRICE) {
            prismaSort.push({price: 'asc'})
        } else if(sort === EnumProductSort.HIGH_PRICE) {
            prismaSort.push({price: 'desc'})
        } else if(sort === EnumProductSort.OLDEST) {
            prismaSort.push({createdAt: 'asc'})
        } else prismaSort.push({categoryId: 'desc'})

        const prismaSearchTerm : Prisma.ProductWhereInput = searchTerm ? {
            OR: [
                {
                    category: {
                        name: {
                            contains: searchTerm,
                            mode: 'insensitive'
                        }
                    },
                },
                {
                    name: {
                        contains: searchTerm,
                        mode: "insensitive"
                    },
                },
                {
                    description: {
                        contains: searchTerm,
                        mode: "insensitive"
                    }
                }
            ]
        } : {}

        const {limit, skip} = this.pagination.getPagination(dto)

        const products = await this.prisma.product.findMany({
            where: prismaSearchTerm,
            orderBy: prismaSort,
            skip,
            take: limit,
            select: {
                ...returnProduct
            }
        })

        return {products, length: await this.prisma.product.count({
            where: prismaSearchTerm
        })}
        
    }   

    async getProduct(id : string) {
        const product = await this.prisma.product.findUnique({
            where: {
                id: +id
            },
            select: {
                ...returnProductObjFulliest
            }
        })

        if(!product) {
            throw new NotFoundException('Product not found')
        }

        return product
    }

    async updateProduct(id : number, dto : ProductDto ) {
        const {name, description, price, images, categoryId} = dto

        const product = await this.prisma.product.update({ 
            where: {
                id
            },
            data: {
                description,
                images,
                name,
                price,
                slug: generateSlug(name),
                category: {
                    connect: {
                        id: categoryId
                    }
                }
            }
        })

        return product
    }

    async deleteProduct(id : number) {
        await this.prisma.product.delete({
            where: {
                id
            }
        })

        return {message: "Succes deleted"}
    }

    async createProduct() {
        const product = await this.prisma.product.create({
            data: {
                description: '',
                name: '',
                price: 0,
                slug: ''
            }
        })

        return product.id
    }   

    async getBySlug(slug : string) {
        const products = await this.prisma.product.findMany({
            where: {
                slug
            },
            select: {
                ...returnProductObjFulliest
            }
        })

        return products
    }

    async getByCategory(categorySlug : string) {
        const product = await this.prisma.product.findMany({
            where: {
                category: {
                    slug: categorySlug
                }
            },
            select: {
                ...returnProductObjFulliest
            }
        })

        if(!product) {
            throw new NotFoundException('Products not found')
        }

        return product
    }

    async getSimilar(id : number) {
        const currentProduct = await this.prisma.product.findUnique({
            where: {
                id
            },
            select: {
                category: {
                    select: {
                        ...returnCategory
                    }
                },
                id : true
            }
        })

        if(!currentProduct) {
            throw new NotFoundException('Current product not found ')
        }

        const products = await this.prisma.product.findMany({
            where: {
                category: {
                    name: currentProduct.category.name
                },
                NOT: {
                    id: currentProduct.id
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                ...returnProductObjFulliest
            }
        })

        return products
    }

    async getById(id : number) {
        const product = await this.prisma.product.findUnique({
            where: {
                id
            },
            select: {
                ...returnProductObjFulliest
            }
        })

        return product
    }

}
