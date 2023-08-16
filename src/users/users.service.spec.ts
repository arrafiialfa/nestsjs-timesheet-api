import { Test, TestingModule } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { UsersService } from 'src/users/users.service';
import { ConflictException } from '@nestjs/common/exceptions';
import { BcryptModule } from 'src/bcrypt/bcrypt.module';
import { NewUserDto } from './dto/newUser.dto';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';


describe('UsersService', () => {

    let usersService: UsersService;
    let userRepository: DeepMocked<Repository<User>>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [BcryptModule],
            providers: [
                UsersService,
                {
                    provide: Repository<User>,
                    useValue: createMock<Repository<User>>(),
                }
            ],
        }).compile();

        usersService = module.get<UsersService>(UsersService);
        userRepository = module.get(Repository<User>);

    });


    describe('Store user', () => {

        it('Should throw conflict error when username already exists in DB', async () => {

            const newUser: NewUserDto = {
                name: 'new user test',
                username: 'halo123',
                password: '123123'
            }

            userRepository.findOne.mockResolvedValue({
                id: 1,
                name: 'new user test',
                username: 'halo123',
                password: '123123'
            })

            await expect(usersService.storeUser(newUser)).rejects.toThrow(ConflictException)
            // await expect(usersService.storeUser(newUser)).resolves.toBeInstanceOf(User)
        })

    })

});
