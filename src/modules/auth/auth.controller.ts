
import { Body, Controller, Get, Post, HttpCode, HttpStatus, Request, Ip, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { Public } from 'src/decorators/public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SignInDto, @Ip() ip: string) {
        return this.authService.signIn(signInDto.email, signInDto.password, ip);
    }

    @ApiBearerAuth()
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

}