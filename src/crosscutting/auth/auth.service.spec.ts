import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AUTHENTICATION_SERVICE } from './interfaces/auth.service.interface';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          useClass: AuthService,
          provide: AUTHENTICATION_SERVICE,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
