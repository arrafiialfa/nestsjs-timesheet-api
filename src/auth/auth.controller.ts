
import { Body, Controller, Get, Post, HttpCode, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto.username, signInDto.password);
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