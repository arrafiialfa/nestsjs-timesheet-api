// create a file named signIn.dto.ts
import { IsNotEmpty } from 'class-validator';

export class SignInDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}
