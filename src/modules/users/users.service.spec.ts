import { Test, TestingModule } from '@nestjs/testing';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { UsersService } from 'src/modules/users/users.service';
import { BcryptModule } from 'src/modules/bcrypt/bcrypt.module';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';


describe('UsersService', () => {

    let usersService: DeepMocked<UsersService>;
    let userRepository: DeepMocked<Repository<User>>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [BcryptModule],
            providers: [
                UsersService,
                {
                    provide: 'USER_REPOSITORY',
                    useValue: createMock<Repository<User>>()
                },
            ],
        }).compile();
        usersService = module.get(UsersService);
        userRepository = module.get('USER_REPOSITORY');
    });

    it('should be defined', () => {
        expect(usersService).toBeDefined()
    })

    describe('check user role', () => {

        it('should returns NotFoundException if user_id provided is not found', async () => {
            userRepository.findOneBy.mockResolvedValue(null);
            await expect(usersService.checkUserRole(10000, 'admin')).rejects.toThrow(NotFoundException)
        })

        it('should returns UnauthorizedException if user found does not have a role', async () => {
            (userRepository.findOneBy as jest.Mock).mockResolvedValue({
                name: 'test',
                role: null
            })
            await expect(usersService.checkUserRole(1, 'admin')).rejects.toThrow(UnauthorizedException);
        })

        it('should returns UnauthorizedException if user role found does not match the given role name', async () => {
            (userRepository.findOneBy as jest.Mock).mockResolvedValue({
                name: 'test',
                role: {
                    name: 'NOT_ADMIN'
                }
            })
            await expect(usersService.checkUserRole(1, 'admin')).rejects.toThrow(UnauthorizedException);
        })

    })
});
