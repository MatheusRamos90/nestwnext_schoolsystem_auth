import { IsEmail, IsNotEmpty } from "class-validator";
import { EnumRoles } from "src/enums/enum-roles";

export class CreateUserLoginDto {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    roles?: EnumRoles[]

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    repassword: string
}
