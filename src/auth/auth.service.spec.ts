import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { JwtModule } from '@nestjs/jwt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common/exceptions';
import { BcryptModule } from 'src/bcrypt/bcrypt.module';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BcryptModule, JwtModule.register({
        global: true,
        secret: 'test-secret',
        signOptions: { expiresIn: '1200s' },
      }), UsersModule, ConfigModule],
      providers: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return access token', async () => {
      const newUser: SignInDto = {
        username: 'test3',
        password: '123123'
      };
      await expect(authService.signIn(newUser.username, newUser.password)).resolves.toHaveProperty('access_token')
    });

    it('wrong username should return notfound exception', async () => {
      const newUser: SignInDto = {
        username: 'test100000000',
        password: '123123'
      }
      await expect(authService.signIn(newUser.username, newUser.password)).rejects.toBeInstanceOf(NotFoundException)
    })

    it('wrong password should return unauthorized exception', async () => {
      const newUser: SignInDto = {
        username: 'test3',
        password: '1111111'
      };
      await expect(authService.signIn(newUser.username, newUser.password)).rejects.toBeInstanceOf(UnauthorizedException)
    })
  });

});
