import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { createMock } from '@golevelup/ts-jest';


describe('AuthController', () => {
    let controller: AuthController;

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
    });

    describe('Test Sign In function', () => {
        it('should return access token', async () => {
            // Arrange
            const signInDto: SignInDto = {
                email: 'test@example.com',
                password: '123123',
            };
            // Act
            const result = await controller.signIn(signInDto, '');
            // Assert
            expect(result).toContain('access_token');
        });
    });

});
