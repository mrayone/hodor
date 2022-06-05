import {
  IUserRepository,
  USER_REPOSITORY,
} from '@domain/repository/userRepository.interface';
import { User } from '@domain/user/user.entity';
import { Inject, Injectable } from '@nestjs/common';

type UserModel = {
  email: string;
  password: string;
};
@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return await this.userRepository.findByEmail(username);
  }

  async create({ email, password }: UserModel): Promise<User> {
    const user = new User({
      password,
      email,
    });

    const userResult = await this.userRepository.store(user);

    return user;
  }
}
