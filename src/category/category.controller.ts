import { Controller, Get, Post, Put, Delete, HttpCode, Param, Body } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import {ValidationPipe} from '@nestjs/common/pipes'
import {UsePipes} from '@nestjs/common/decorators'
import { CategoryDto } from './dto/category.dto';
import { CategorySlug } from './dto/category.slug.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAll() {
    return this.categoryService.getAll()
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  updateCategory(@Param('id') id : string, @Body() dto : CategorySlug) {
    return this.categoryService.updateCategory(id, dto)
  }

  @Auth()
  @Get(':id')
  getById(@Param('id') id : string) {
    return this.categoryService.getCategory(id)
  }

  @Auth()
  @HttpCode(200)
  @Delete(':id')
  deleteCategory(@Param('id') id : string) {
    return this.categoryService.deleteCategory(id)
  }

  @Auth()
  @HttpCode(200)
  @Post('add')
  createCategory() {
    return this.categoryService.createCategory()
  }

  @Get('by-slug/:slug')
  getBySlug(@Param('slug') slug : string) {
    return this.categoryService.getBySlug(slug)
  }

}
