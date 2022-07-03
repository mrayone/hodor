import {
  IUserRepository,
  USER_REPOSITORY,
} from '@domain/user/repository/userRepository.interface';
import { User } from '@domain/user/user.entity';
import { Inject, Injectable, BadRequestException } from '@nestjs/common';

type UserModel = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return await this.userRepository.findByEmail(username);
  }

  async create({
    firstName,
    lastName,
    email,
    password,
  }: UserModel): Promise<User> {
    const user = new User({
      password,
      email,
      firstName,
      lastName,
    });

    const findUser = await this.findOne(email);

    if (findUser) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'This e-mail already in use',
      });
    }

    const userResult = await this.userRepository.store(user);

    return userResult;
  }
}
