
import { Body, Controller, Get, Post, HttpCode, HttpStatus, Request, Ip, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SignInDto, @Ip() ip: string) {
        return this.authService.signIn(signInDto.username, signInDto.password, ip);
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Get('private')
    getPrivate() {
        return "this is private"
    }

    @Public()
    @Get('public')
    getPublicTest() {
        return "this is public test"
    }

}