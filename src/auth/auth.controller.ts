import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { RefreshDto } from './refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  register(@Body() data : AuthDto) {
    return this.authService.register(data)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  login(@Body() data : AuthDto) {
    return this.authService.login(data)
  }
  
  @UsePipes(new ValidationPipe()) 
  @HttpCode(200)
  @Post('access')
  accesToken(@Body() dto : RefreshDto) {
    return this.authService.getNewTokens(dto.refreshToken)
  }

}
