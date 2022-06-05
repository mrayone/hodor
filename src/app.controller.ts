import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from '@infra/shared/auth/auth.service';
import { JwtAuthGuard } from '@infra/shared/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '@infra/shared/auth/guards/local-auth.guard';
import { CreateUserDto } from '@application/dtos/createUser.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() createUser: CreateUserDto) {
    return this.authService.register(createUser.username, createUser.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
