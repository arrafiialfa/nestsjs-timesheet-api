import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common/exceptions';
import { BcryptModule } from 'src/bcrypt/bcrypt.module';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BcryptModule],
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

    it('wrong username should return notfound exception', async () => {
      const newUser: SignInDto = {
        username: 'test100000000',
        password: '123123'
      }
      await expect(service.signIn(newUser.username, newUser.password)).rejects.toBeInstanceOf(NotFoundException)
    })

    it('wrong password should return unauthorized exception', async () => {
      const newUser: SignInDto = {
        username: 'test3',
        password: '1111111'
      };
      await expect(service.signIn(newUser.username, newUser.password)).rejects.toBeInstanceOf(UnauthorizedException)
    })
  });

});
