import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateScopeOfWorkDto {

    @IsNotEmpty()
    name: string;

    @IsOptional()
    description: string | null;

}
