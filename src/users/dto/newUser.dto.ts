import { IsNotEmpty } from 'class-validator';

export class NewUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}
