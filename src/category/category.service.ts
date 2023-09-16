import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { returnCategory } from './dto/return.category';
import { CategoryDto } from './dto/category.dto';
import { generateSlug } from 'src/utils/generator.slug';
import { CategorySlug } from './dto/category.slug.dto';

@Injectable()
export class CategoryService {

    constructor(private prisma : PrismaService) {}

    async getCategory(id : string) {
        const category = await this.prisma.category.findUnique({
            where: {
                id: +id
            },
            select: {
                ...returnCategory
            }
        })

        if(!category) {
            throw new NotFoundException('Category not found')
        }

        return category
    }

    async updateCategory(id : string, dto : CategorySlug ) {
        const category = await this.prisma.category.update({ 
            where: {
                id: +id
            },
            data: {
                name: dto.name,
                slug: dto.slug
            },
            select: {
                ...returnCategory
            }
        })

        return category
    }

    async deleteCategory(id : string) {
        const category = await this.prisma.category.delete({
            where: {
                id: +id
            }
        })

        return {message: "Succes deleted"}
    }

    async createCategory() {
        const category = await this.prisma.category.create({
            data: {
                name: '',
                slug: ''
            }
        })

        return category
    }   

    async getBySlug(slug : string) {
        const category = await this.prisma.category.findUnique({
            where: {
                slug
            },
            select: {
                ...returnCategory
            }
        })

        return category
    }

    async getAll() {
        const categories = await this.prisma.category.findMany({select: {...returnCategory}})

        return categories
    }

}
