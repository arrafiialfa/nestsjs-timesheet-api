import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {

        let statusCode = context.switchToHttp().getResponse().statusCode || HttpStatus.OK;
        let messages: any = true;

        // Check if it's an error response
        if (statusCode >= 400 && statusCode < 600) {
          messages = context.switchToHttp().getResponse().message || 'An error occurred'; // Capture error message
          statusCode = context.switchToHttp().getResponse().statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
        } else if (statusCode === HttpStatus.OK) {
          messages = context.switchToHttp().getResponse().message || 'Operation successful';
        }

        return {
          data: [data],
          messages: messages,
          statusCode: statusCode,
        }
      })
    );
  }
}
