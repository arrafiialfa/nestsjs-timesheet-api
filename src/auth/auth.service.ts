import { Logger, Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt'
import { checkPassword } from 'src/lib/bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    private readonly logger = new Logger(AuthService.name)

    async signIn(username: string, pass: string): Promise<any> {

        const user = await this.usersService.findOne(username);

        //if no user with provided username is not found 
        if (!user) {
            this.logger.warn(`User with username ${username} does not exist in the DB`);
            throw new NotFoundException()
        }

        //if password provided doesnt match
        if (!checkPassword(pass, user.password)) {
            this.logger.error(`Username: ${username} made an invalid login attempt`)
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, username: user.username }

        this.logger.log(`Successfully logged in user with username: ${username}`)

        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}