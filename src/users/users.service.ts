import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
    ) { }

    private readonly users = [
        {
            userId: 1,
            username: 'test',
            password: '123123',
        },
        {
            userId: 2,
            username: 'maria',
            password: 'guess',
        },
    ];

    async findOne(username: string): Promise<User> {
        return this.userRepository.findOne({
            where: [{ username: username }]
        });
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }
}