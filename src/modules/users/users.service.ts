import { Injectable, Inject, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DeleteResult, Repository, FindOptionsWhere } from 'typeorm';
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

    async delete(FindOptionsWhere: FindOptionsWhere<User>): Promise<DeleteResult> {
        return this.userRepository.delete(FindOptionsWhere)
    }

    /**
     * check if user has a role
     * @param user_id the user id to check the role for 
     * @param roleToCheck role name to check
     * @param roleLabel optional, label to describe the role. will be used for error messages
     */
    async checkUserRole(user_id: number, roleToCheck: string, roleLabel?: string): Promise<User> {

        const user = await this.userRepository.findOneBy({ id: user_id });

        if (!user) {
            throw new NotFoundException(`check ${roleLabel ?? roleToCheck}_id provided, ${roleLabel ?? roleToCheck}_id provided is not a user in the database`)
        }

        if (!user.role) {
            throw new UnauthorizedException(`${roleLabel ?? roleToCheck}_id provided does not have a role`)
        }

        if (user.role?.name !== roleToCheck) {
            throw new UnauthorizedException(`${roleLabel ?? roleToCheck}_id provided does not correspond to user with the role ${roleLabel ?? roleToCheck}`)
        }

        return user;
    }

}