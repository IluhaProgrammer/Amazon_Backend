import { Controller, HttpCode, Put, Get, Body, Patch, Param } from '@nestjs/common';
import { UserService } from './user.service';
import {UsePipes} from '@nestjs/common/decorators'
import {ValidationPipe} from '@nestjs/common/pipes'
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UpdateDto } from './dto/update.user.dto';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // get profile
  // toggle favorites
  // update profile

  @Get('profile')
  @Auth()
  getProfile(@CurrentUser('id') id : number) {
    return this.userService.getProfile(id)
  }
  
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put('update-profile')
  updateProfile(@Body() dto : UpdateDto, @CurrentUser('id') id : number) {
    return this.userService.updateProfile(dto, id)
  }

  @HttpCode(200)
  @Auth()
  @Patch('profile/favorites/:productId')
  toggleFavorites(@Param('productId') productId : string, @CurrentUser('id') id : number ) {
    return this.userService.toggleFavorites(productId, id)
  }
}

