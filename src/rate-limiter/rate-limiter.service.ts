import { Injectable, Inject } from '@nestjs/common';
import { RateLimiterPostgres } from 'rate-limiter-flexible';

@Injectable()
export class RateLimiterService {

    constructor(
        @Inject('USER_REPOSITORY')
        private lets
    ) { }

}
