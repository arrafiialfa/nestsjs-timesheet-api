import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger(`HTTP`);
    use(req: Request, res: Response, next: NextFunction) {
        res.on('finish', () => {
            const statusCode = res.statusCode;
            if (statusCode === 401 || statusCode === 404 || statusCode === 405 || statusCode === 403 || statusCode === 500) {
                this.logger.warn(`[${req.method}] ${req.url} - ${statusCode} ${req.statusMessage} ${res.statusMessage}`);
            } else if (statusCode == 500) {
                this.logger.error(`[${req.method}] ${req.url} - ${statusCode} ${req.statusMessage} ${res.statusMessage}`);
            } else {
                this.logger.log(`Logging HTTP request METHOD:${req.method} URL:${req.url} STATUS:${res.statusCode}`);
            }
        });
        next();
    }
}

