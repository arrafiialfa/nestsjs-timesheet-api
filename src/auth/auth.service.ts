import { Logger, Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt'
import { RateLimiterMemory } from 'rate-limiter-flexible';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private bcrypt: BcryptService
    ) { }

    private readonly logger = new Logger(AuthService.name)
    private maxConsecutiveFailsByUsernameIP = 5;

    private limiterConsecutiveFailsByUsernameIP = new RateLimiterMemory({
        keyPrefix: 'login_fail_consecutive_username_ip',
        points: this.maxConsecutiveFailsByUsernameIP,
        duration: 60 * 60 * 3, // Store number for three hours since first fail
        blockDuration: 60 * 15, // Block for 15 minutes
    });

    async signIn(username: string, pass: string, userip: string): Promise<any> {

        const user = await this.usersService.findOne(username);
        const username_ip = `${username}:${userip}`;

        //if no user with provided username is not found 
        if (!user) {
            await this.limiterConsecutiveFailsByUsernameIP.consume(username_ip);
            this.logger.warn(`User with username ${username} does not exist in the DB`);
            throw new NotFoundException()
        }

        //if password provided doesnt match
        if (!this.bcrypt.checkPassword(pass, user.password)) {
            await this.limiterConsecutiveFailsByUsernameIP.consume(username_ip);
            this.logger.error(`Username: ${username} made an invalid login attempt`)
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, username: user.username }

        this.logger.log(`Successfully logged in user with username: ${username}`)

        //remove counters after successful login
        await this.limiterConsecutiveFailsByUsernameIP.delete(username_ip);

        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}