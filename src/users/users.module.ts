import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/entities/user.providers';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { BcryptModule } from 'src/bcrypt/bcrypt.module';
import { RateLimiterModule } from 'src/rate-limiter/rate-limiter.module';

@Module({
  imports: [BcryptModule, DatabaseModule, RateLimiterModule],
  providers: [...userProviders, UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule { }
