import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger(`HTTP`);
    use(req: Request, res: Response, next: NextFunction) {
        this.logger.log(`Logging HTTP request METHOD:${req.method} URL:${req.url} STATUS:${res.statusCode}`);
        next();
    }
}
