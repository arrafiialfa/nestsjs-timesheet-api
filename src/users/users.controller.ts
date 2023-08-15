import { Controller, HttpCode, HttpStatus, Post, Body, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/decorators/public.decorator';
import { NewUserDto } from './dto/newUser.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('new-user')
    async saveToDB(@Body() newUserDto: NewUserDto) {
        try {
            return await this.userService.storeUser(newUserDto)
        } catch (error) {
            throw new HttpException(
                {
                    error: error,
                    messages: error.message
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            )
        }
    }


}
