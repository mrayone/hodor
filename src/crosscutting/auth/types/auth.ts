import { ApiProperty } from '@nestjs/swagger';

export class TokenClaims {
  email: string;
  name: string;
  sub: string;
  given_name: string;
}

export class RegistrationModel {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export class AccessToken {
  @ApiProperty()
  access_token: string;
}
