import { AccessToken, RegistrationModel, TokenClaims } from '../types/auth';
export const AUTHENTICATION_SERVICE = 'AUTHENTICATION_SERVICE';

export interface IAuthenticationService {
  getUserCredentials(
    username: string,
    pass: string,
  ): Promise<TokenClaims | null>;
  register(registrationMode: RegistrationModel): Promise<AccessToken>;
  login(user: TokenClaims): Promise<AccessToken>;
}
