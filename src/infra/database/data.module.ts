import { USER_REPOSITORY } from '@domain/user/repository/userRepository.interface';
import UserRepository from '@infra/database/prisma/repository/user.repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

const repositoryFactory = {
  provide: USER_REPOSITORY,
  useFactory: (prismaService: PrismaService) => {
    return new UserRepository(prismaService);
  },
  inject: [PrismaService],
};

@Module({
  providers: [PrismaService, repositoryFactory],
  exports: [USER_REPOSITORY],
})
export class DataModule {}
