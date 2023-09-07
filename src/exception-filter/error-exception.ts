import { Catch, ExceptionFilter, ArgumentsHost, Logger } from '@nestjs/common';

@Catch(Error)
export class ErrorFilter implements ExceptionFilter {
    private logger = new Logger('ErrorFilter');

    catch(error: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        // You can customize the status code and message for errors as needed
        const statusCode = 500; // Internal Server Error
        const message = error.message || 'Internal Server Error';

        this.logger.error(`[${request.method}] url:${request.url} - ${statusCode} - ${message}, details: ${JSON.parse(JSON.stringify(error, null, 2)).response?.message || "{}"}`);

        console.error(error)
        response.status(statusCode).json({
            statusCode,
            message,
            details: [error]
        });
    }
}
