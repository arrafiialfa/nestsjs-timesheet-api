import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { NewUserDto } from './dto/newUser.dto';
import { BcryptService } from 'src/modules/bcrypt/bcrypt.service';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
        private bcrypt: BcryptService
    ) { }

    async findOneById(id: number): Promise<User> {
        return this.userRepository.findOneBy({ id: id });
    }

    async findOne(email: string): Promise<User> {
        return this.userRepository.findOne({
            where: [{ email: email }]
        });
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async storeUser(user: NewUserDto): Promise<User> {
        const newUser = this.userRepository.create({ ...user, password: this.bcrypt.generatePassword(user.password) });
        return this.userRepository.save(newUser);
    }

    async getUserRole(id: number) {
        const user = await this.userRepository.findOneBy({ id: id })
        return user.role
    }
}