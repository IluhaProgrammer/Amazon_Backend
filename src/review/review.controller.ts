import { Controller, Get, Post, HttpCode, Param, Body } from '@nestjs/common';
import { ReviewService } from './review.service';
import {ValidationPipe} from '@nestjs/common/pipes'
import {UsePipes} from '@nestjs/common/decorators'
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { ReviewDto } from './dto/review.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  getAll() {
    return this.reviewService.getAll()
  }

  @Auth()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Post('create-review/:productId')
  createReview(
    @CurrentUser('id') id : number,
    @Param('productId') productId : string,
    @Body() dto : ReviewDto
  ) {
    return this.reviewService.createReview(id, dto, +productId)
  }

  @Get('average/:productId')
  getAverageRating(@Param('productId') productId : string) {
    return this.reviewService.getAverageValueByProductId(+productId)
  } 

}
