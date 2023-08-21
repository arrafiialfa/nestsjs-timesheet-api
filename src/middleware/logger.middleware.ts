import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger(`HTTP`);
    use(req: Request, res: Response, next: NextFunction) {
        res.on('finish', () => {
            const statusCode = res.statusCode;
            if (statusCode == 200) {
                this.logger.log(`Logging HTTP [${req.method}] url:${req.url} - ${res.statusCode} - ${res.statusMessage}`);
            } else if (statusCode === 401 || statusCode === 404 || statusCode === 405 || statusCode === 403 || statusCode == 500) {
                this.logger.error(`Logging HTTP [${req.method}] url:${req.url} - ${res.statusCode} - ${res.statusMessage}`);
            }
        });
        next();
    }
}

