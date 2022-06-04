import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from '@infra/shared/auth/auth.module';
import { UsersModule } from '@domain/users/users.module';

@Module({
  imports: [AuthModule, UsersModule, ConfigModule.forRoot(), 
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) | 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [],
    synchronize: true,
  })],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
