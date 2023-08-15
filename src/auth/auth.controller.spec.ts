import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { createMock, DeepMocked } from '@golevelup/ts-jest';


describe('AuthController', () => {
    let controller: AuthController;
    let authService: DeepMocked<AuthService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                AuthController,
                {
                    provide: AuthService,
                    useValue: createMock<AuthService>(),
                },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        authService = module.get(AuthService);
    });

    describe('signIn', () => {
        it('should return access token', async () => {
            // Arrange
            const signInDto: SignInDto = {
                username: 'test3',
                password: '123123',
            };
            authService.signIn.mockResolvedValue({ access_token: 'mocked-token' });

            // Act
            const result = await controller.signIn(signInDto);

            // Assert
            expect(result).toEqual({ access_token: 'mocked-token' });
        });
    });

});
