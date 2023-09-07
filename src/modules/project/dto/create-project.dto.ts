import { IsNotEmpty } from "class-validator";

export class CreateProjectDto {
    @IsNotEmpty()
    contract_number: string;

    @IsNotEmpty()
    name: string;
}
