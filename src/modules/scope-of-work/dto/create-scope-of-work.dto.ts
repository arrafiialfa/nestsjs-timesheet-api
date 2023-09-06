import { IsNotEmpty } from "class-validator";

export class CreateScopeOfWorkDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

}
