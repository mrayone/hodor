import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@application/users/users.service';
import * as bcrypt from 'bcrypt';

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
        username: user.email,
        userId: user.uuid,
      };
    }
    return null;
  }

  async register(
    username: string,
    pass: string,
  ): Promise<{
    acesss_token: string;
  }> {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(pass, salt);

    const user = await this.usersService.create({
      email: username,
      password: hashPassword,
    });

    const access = this.login({
      username: user.email,
      userId: user.uuid,
    });

    return access;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };

    return {
      acesss_token: this.jwtService.sign(payload),
    };
  }
}
