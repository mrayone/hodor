import { DataModule } from '@infra/database/data.module';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [DataModule],
})
export class UsersModule {}
