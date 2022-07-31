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
import { AuthUserDTO } from '@application/user/dtos/auth-user.dto';
import { AccessToken } from '@crosscutting/auth/types/auth';

import { ApiBody, ApiExtension, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('authentication')
export class AppController {
  constructor(
    @Inject(AUTHENTICATION_SERVICE)
    private authService: IAuthenticationService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBody({
    type: AuthUserDTO,
  })
  @ApiExtension('x-codeSamples', [
    {
      lang: 'cURL',
      label: 'CLI',
      source: `curl --request POST \ --url '${process.env.APP_URL}/auth/login' \ --header 'content-type: application/json: ' \ --data '{"email": "string","password": "string"}'`,
    },
  ])
  @ApiResponse({
    type: AccessToken,
    status: 201,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async login(@Request() request) {
    return this.authService.login(request.user);
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
