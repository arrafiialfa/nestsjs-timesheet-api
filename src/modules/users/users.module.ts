import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/entities/user.providers';
import { UsersService } from './users.service';
import { BcryptModule } from 'src/modules/bcrypt/bcrypt.module';
import { RateLimiterModule } from 'src/modules/rate-limiter/rate-limiter.module';

@Module({
  imports: [BcryptModule, DatabaseModule, RateLimiterModule],
  providers: [...userProviders, UsersService],
  exports: [UsersService, BcryptModule, RateLimiterModule, ...userProviders],
})
export class UsersModule { }
