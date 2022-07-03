import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@application/user/users.service';
import * as bcrypt from 'bcrypt';

type LoginType = {
  email: string;
  name: string;
  sub: string;
  givenName: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const isMatchPass = await bcrypt.compare(pass, user.password);
    if (user && isMatchPass) {
      return {
        email: user.email,
        sub: user.uuid,
        name: user.fullName,
        givenName: user.firstName,
      };
    }
    return null;
  }

  async register({
    email,
    password,
    firstName,
    lastName,
  }: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<{
    acesss_token: string;
  }> {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

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
      givenName: user.firstName,
    });

    return access;
  }

  async login(user: LoginType) {
    const payload = {
      email: user.email,
      name: user.name,
      sub: user.sub,
      given_name: user.givenName,
    };

    console.log(user);
    return {
      acesss_token: this.jwtService.sign(payload),
    };
  }
}
