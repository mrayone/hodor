import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@application/user/users.service';
import * as bcrypt from 'bcrypt';
import { AccessToken, TokenClaims, RegistrationModel } from './types/auth';
import { IAuthenticationService } from './interfaces/auth.service.interface';

@Injectable()
export class AuthService implements IAuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async getUserCredentials(
    username: string,
    pass: string,
  ): Promise<TokenClaims | null> {
    const user = await this.usersService.findOne(username);
    if (!user) return null;

    const isMatchPass = await bcrypt.compare(pass, user.password);
    if (user && isMatchPass) {
      return {
        email: user.email,
        sub: user.uuid,
        name: user.fullName,
        given_name: user.firstName,
      };
    }
    return null;
  }

  async register({
    email,
    password,
    firstName,
    lastName,
  }: RegistrationModel): Promise<AccessToken> {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    //notify to create user;
    const user = await this.usersService.create({
      email,
      password: hashPassword,
      firstName,
      lastName,
    });

    const access = this.login({
      email: user.email,
      sub: user.uuid,
      name: user.fullName,
      given_name: user.firstName,
    });

    return access;
  }

  async login({
    email,
    name,
    sub,
    given_name,
  }: TokenClaims): Promise<AccessToken> {
    const payload = {
      email,
      name,
      sub,
      given_name,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
