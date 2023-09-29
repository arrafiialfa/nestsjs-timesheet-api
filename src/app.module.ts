import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { FilesModule } from './modules/files/files.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { BcryptModule } from './modules/bcrypt/bcrypt.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './response-interceptor/response-interceptor.interceptor';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD, APP_FILTER } from '@nestjs/core/constants';
import { ErrorFilter } from './exception-filter/error-exception';
import { TimesheetModule } from './modules/timesheet/timesheet.module';
import { TimesheetDetailModule } from './modules/timesheet-detail/timesheet-detail.module';
import { ScopeOfWorkModule } from './modules/scope-of-work/scope-of-work.module';
import { ProjectModule } from './modules/project/project.module';
import { HolidayModule } from './modules/holiday/holiday.module';
import { TimesheetToExcelModule } from './modules/timesheet-to-excel/timesheet-to-excel.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10
    }),
    AuthModule, UsersModule, FilesModule, BcryptModule,
    TimesheetModule, TimesheetDetailModule, ScopeOfWorkModule,
    ProjectModule, HolidayModule, TimesheetToExcelModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: ErrorFilter
    }
    ,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
