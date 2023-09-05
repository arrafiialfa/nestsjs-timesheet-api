import { Logger, Injectable, UnauthorizedException, NotFoundException, HttpException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { BcryptService } from 'src/modules/bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt'
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private bcrypt: BcryptService
    ) { }

    private readonly logger = new Logger(AuthService.name)
    private maxConsecutiveFailsByEmailIP = 5;

    private limiterConsecutiveFailsByEmailIP = new RateLimiterMemory({
        keyPrefix: 'login_fail_consecutive_username_ip',
        points: this.maxConsecutiveFailsByEmailIP,
        duration: 60 * 60 * 3, // Store number for three hours since first fail
        blockDuration: 60 * 15, // Block for 15 minutes
    });

    async signIn(email: string, pass: string, userip: string): Promise<any> {

        const user = await this.usersService.findOne(email);
        const email_ip = `${email}:${userip}`;
        const rlEmail = await this.limiterConsecutiveFailsByEmailIP.get(email_ip);


        if (rlEmail?.consumedPoints >= this.maxConsecutiveFailsByEmailIP) {
            const retrySecs = Math.round(rlEmail.msBeforeNext / 1000) || 1;
            throw new HttpException(`Too Many Failed Attempts, retry after ${retrySecs} seconds`, HttpStatus.TOO_MANY_REQUESTS);
        }

        //if no user with provided username is not found 
        if (!user) {
            const rlRes = await this.limiterConsecutiveFailsByEmailIP.consume(email_ip);
            console.log(rlRes);
            this.logger.warn(`User with email ${email} does not exist in the DB`);
            throw new NotFoundException()
        }

        //if password provided doesnt match
        if (!this.bcrypt.checkPassword(pass, user.password)) {
            await this.limiterConsecutiveFailsByEmailIP.consume(email_ip);
            this.logger.error(`User with email: ${email} made an invalid login attempt`)
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, email: user.email }

        this.logger.log(`Successfully logged in user with email: ${email}`)

        //remove counters after successful login
        await this.limiterConsecutiveFailsByEmailIP.delete(email_ip);

        return {
            access_token: await this.jwtService.signAsync(payload)
        }


    }
}