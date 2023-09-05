import { Injectable } from '@nestjs/common';
import { RateLimiterPostgres } from "rate-limiter-flexible"


@Injectable()
export class RateLimiterService {

    private createRateLimiter(opts: any): Promise<RateLimiterPostgres> {
        return new Promise<RateLimiterPostgres>((resolve, reject) => {
            // eslint-disable-next-line prefer-const
            let rateLimiter
            const ready = (err) => {
                if (err) {
                    reject(err);
                }
                resolve(rateLimiter);
            }

            rateLimiter = new RateLimiterPostgres(opts, ready)

        })
    }


}
