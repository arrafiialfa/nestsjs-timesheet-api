import { IsNotEmpty } from 'class-validator';

export class NewUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}
