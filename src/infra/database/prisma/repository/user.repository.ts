import { IUserRepository } from '@domain/repository/userRepository.interface';
import { User } from '@domain/user/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  public async store(user: User): Promise<User> {
    const { id, password, email, isActive, updatedAt, uuid, createdAt } =
      await this.prisma.user.create({
        data: {
          email: user.email,
          password: user.password,
          uuid: user.uuid,
        },
      });

    return new User({
      id,
      password,
      email,
      createdAt,
      isActive,
      updatedAt,
      uuid,
    });
  }

  public async findById(theId: number): Promise<User> {
    const { id, password, email, isActive, updatedAt, uuid, createdAt } =
      await this.prisma.user.findUnique({
        where: {
          id: theId,
        },
      });

    return new User({
      id,
      password,
      email,
      createdAt,
      isActive,
      updatedAt,
      uuid,
    });
  }

  public async findByEmail(theEmail: string): Promise<User> {
    const { id, password, email, isActive, updatedAt, uuid, createdAt } =
      await this.prisma.user.findUnique({
        where: {
          email: theEmail,
        },
      });

    return new User({
      id,
      password,
      email,
      createdAt,
      isActive,
      updatedAt,
      uuid,
    });
  }
}

export default UserRepository;
