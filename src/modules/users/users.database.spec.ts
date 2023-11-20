import { Test, TestingModule } from "@nestjs/testing";
import { BcryptModule } from "../bcrypt/bcrypt.module";
import { DatabaseModule } from "src/database/database.module";
import { UsersService } from "./users.service";
import { DataSource } from "typeorm";
import { DeleteResult } from "typeorm";
import { User } from "src/entities/user.entity";

describe('User CRUD database test', () => {
    let usersService: UsersService;
    let datasource: DataSource;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [BcryptModule, DatabaseModule],
            providers: [
                UsersService,
                {
                    provide: 'USER_REPOSITORY',
                    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
                    inject: ['DATA_SOURCE'],
                },
            ],
        }).compile();

        usersService = module.get(UsersService)
        datasource = module.get('DATA_SOURCE')

    });

    afterEach(async () => {
        await datasource.destroy()
    })

    it('should return new instance of User', async () => {
        await expect(usersService.storeUser({ name: 'test_user', email: 'test@test.com', password: '123123' })).resolves.toBeInstanceOf(User);
    })

    it('should delete test user', async () => {
        await expect(usersService.delete({ name: 'test_user' })).resolves.toBeInstanceOf(DeleteResult)
    })

})