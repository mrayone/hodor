import { IUserRepository } from '@domain/repository/userRepository.interface';
import { User } from '@domain/user/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  public async store(user: User): Promise<User> {
    const profile = await this.prisma.profile.findUnique({
      where: { name: 'User' },
    });
    const {
      id,
      password,
      email,
      firstName,
      lastName,
      status,
      updatedAt,
      uuid,
      createdAt,
    } = await this.prisma.user.create({
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        profileId: profile.id,
        uuid: user.uuid,
      },
    });

    return new User({
      id,
      password,
      email,
      firstName,
      lastName,
      createdAt,
      status,
      updatedAt,
      uuid,
    });
  }

  public async findById(theId: number): Promise<User> {
    const {
      id,
      password,
      email,
      status,
      firstName,
      lastName,
      updatedAt,
      uuid,
      createdAt,
    } = await this.prisma.user.findUnique({
      where: {
        id: theId,
      },
    });

    return new User({
      id,
      password,
      email,
      firstName,
      lastName,
      createdAt,
      status,
      updatedAt,
      uuid,
    });
  }

  public async findByEmail(theEmail: string): Promise<User> {
    const {
      id,
      password,
      email,
      status,
      firstName,
      lastName,
      updatedAt,
      uuid,
      createdAt,
    } = await this.prisma.user.findUnique({
      where: {
        email: theEmail,
      },
    });

    return new User({
      id,
      password,
      email,
      createdAt,
      status,
      firstName,
      lastName,
      updatedAt,
      uuid,
    });
  }
}

export default UserRepository;
