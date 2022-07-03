import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, ForbiddenException } from '@nestjs/common';
import { TokenClaims } from './types/auth';
import {
  IAuthenticationService,
  AUTHENTICATION_SERVICE,
} from './interfaces/auth.service.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AUTHENTICATION_SERVICE)
    private readonly authService: IAuthenticationService,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<TokenClaims> {
    const credencials = await this.authService.getUserCredentials(
      email,
      password,
    );
    if (!credencials) {
      throw new ForbiddenException();
    }
    return credencials;
  }
}
