import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  Inject,
} from '@nestjs/common';
import { JwtAuthGuard } from '@crosscutting/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '@crosscutting/auth/guards/local-auth.guard';
import { CreateUserDto } from '@application/user/dtos/createUser.dto';
import {
  IAuthenticationService,
  AUTHENTICATION_SERVICE,
} from '@crosscutting/auth/interfaces/auth.service.interface';

@Controller()
export class AppController {
  constructor(
    @Inject(AUTHENTICATION_SERVICE)
    private authService: IAuthenticationService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(
    @Body() { email, lastName, firstName, password }: CreateUserDto,
  ) {
    return this.authService.register({
      email,
      firstName,
      lastName,
      password,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
