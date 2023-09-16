import { Controller, Get, Post, Delete, Put, Param, Body, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import {ValidationPipe} from '@nestjs/common/pipes'
import {UsePipes} from '@nestjs/common/decorators'
import { GetAllProductDto } from './dto/filter.product.dto';
import { ProductDto } from './dto/product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('similar/:id')
  getSimilar(@Param('id') id : string) {
    return this.productService.getSimilar(+id) 
  }

  @Get('by-slug/:slug')
  getBySlug(@Param('slug') slug : string) {
    return this.productService.getBySlug(slug)
  }

  @Get('category-slug/:categorySlug')
  getByCategorySlug(@Param('categorySlug') categorySlug : string) {
    return this.productService.getByCategory(categorySlug)
  }

  @Post('add')
  createProduct() {
    return this.productService.createProduct()
  }

  @Delete('delete/:id')
  deleteProduct(@Param('id') id : string) {
    return this.productService.deleteProduct(+id)
  }

  @UsePipes(new ValidationPipe())
  @Get()
  getAll(@Query() queryDto : GetAllProductDto) {
    return this.productService.getAllProducts(queryDto)
  }

  @Put('update/:productId')
  @UsePipes(new ValidationPipe())
  updateProduct(@Param('productId') productId : string, @Body() dto : ProductDto) {
    return this.productService.updateProduct(+productId, dto)
  }

  @Get(':id')
  getById(@Param('id') id : string )  {
    return this.productService.getById(+id) 
  }
  
}
