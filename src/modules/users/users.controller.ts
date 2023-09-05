import { Controller, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/decorators/public.decorator';
import { NewUserDto } from './dto/newUser.dto';
import { ApiTags } from '@nestjs/swagger/dist/decorators';

@Controller('users')
@ApiTags('Users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('new-user')
    async saveToDB(@Body() newUserDto: NewUserDto) {
        return await this.userService.storeUser(newUserDto)
    }


}