export type TokenClaims = {
  email: string;
  name: string;
  sub: string;
  givenName: string;
};

export type RegistrationModel = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type AccessToken = {
  access_token: string;
};