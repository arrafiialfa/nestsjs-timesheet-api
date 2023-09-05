// create a file named signIn.dto.ts
import { IsNotEmpty } from 'class-validator';

export class SignInDto {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}
