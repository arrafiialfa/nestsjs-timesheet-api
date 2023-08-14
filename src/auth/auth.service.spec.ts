import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common/exceptions';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return access token', async () => {

      const newUser: SignInDto = {
        username: 'test3',
        password: '123123'
      };

      await expect(service.signIn(newUser.username, newUser.password)).resolves.toBeInstanceOf(JwtService)
    });

    it('wrong password should return unauthorized exception', async () => {

      const newUser: SignInDto = {
        username: 'test3',
        password: '123123'
      };

      await expect(service.signIn(newUser.username, newUser.password)).rejects.toBeInstanceOf(BadRequestException)
    })
  });

});
