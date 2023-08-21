import { Catch, ExceptionFilter, HttpException, ArgumentsHost, Logger } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    private logger = new Logger('HttpExceptionFilter');

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const statusCode = exception.getStatus();
        const message = exception.message;

        this.logger.error(`[${request.method}] url:${request.url} - ${statusCode} - ${message}`);

        response.status(statusCode).json({
            statusCode,
            message,
        });
    }
}
