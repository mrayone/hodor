import { User } from '@domain/user/user.entity';
export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface IUserRepository {
  store(user: User): Promise<User>;
  findById(id: number): Promise<User>;
  findByEmail(theEmail: string): Promise<User>;
}
