import { Logger, Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private bcrypt: BcryptService
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
        if (!this.bcrypt.checkPassword(pass, user.password)) {
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