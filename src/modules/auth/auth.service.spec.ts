import { Test, TestingModule } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { JwtModule } from '@nestjs/jwt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common/exceptions';
import { BcryptModule } from 'src/modules/bcrypt/bcrypt.module';
import { UsersService } from 'src/modules/users/users.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: DeepMocked<UsersService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BcryptModule, JwtModule.register({
        global: true,
        secret: 'test-secret',
        signOptions: { expiresIn: '1200s' },
      })],
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: createMock<UsersService>(),
        }
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get(UsersService);

    //mock usersService.findOne to return :
    const mockedResolvedUser = {
      id: 23,
      name: 'tstname',
      email: 'test3@gmail.com',
      password: '$2a$10$KkWrvWRrItS7qO8to2uai./zZizI5Wblk2nXWDfERB7Bn2CJxtlpO' //this is 123123
    }
    userService.findOne.mockResolvedValue(mockedResolvedUser);
  });

  describe('login', () => {
    it('should return access token', async () => {
      const newUser: SignInDto = {
        email: 'test3',
        password: '123123'
      };

      await expect(authService.signIn(newUser.email, newUser.password, 'ip')).resolves.toHaveProperty('access_token')
    });

    it('wrong username should return notfound exception', async () => {
      //mock when userService does not return a user object
      userService.findOne.mockResolvedValue(null);
      const newUser: SignInDto = {
        email: '',
        password: '123123'
      }
      await expect(authService.signIn(newUser.email, newUser.password, 'ip')).rejects.toThrow(NotFoundException)
    })

    it('wrong password should return unauthorized exception', async () => {
      const newUser: SignInDto = {
        email: 'test3',
        password: '1111111'
      };
      await expect(authService.signIn(newUser.email, newUser.password, 'ip')).rejects.toThrow(UnauthorizedException)
    })
  });

});
