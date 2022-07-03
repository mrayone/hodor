import { ApplicationModule } from '@application/application.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { AUTHENTICATION_SERVICE } from './interfaces/auth.service.interface';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    ApplicationModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [
    {
      useClass: AuthService,
      provide: AUTHENTICATION_SERVICE,
    },
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [
    {
      useClass: AuthService,
      provide: AUTHENTICATION_SERVICE,
    },
  ],
})
export class AuthModule {}
