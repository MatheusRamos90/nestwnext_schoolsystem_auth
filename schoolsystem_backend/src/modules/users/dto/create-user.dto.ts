import { IsEmail, IsNotEmpty } from "class-validator";
import { EnumRoles } from "src/enums/enum-roles";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    roles: Array<EnumRoles>;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    repassword: string
}
