import { IsEmail, IsNotEmpty } from "class-validator";
import { EnumRoles } from "src/enums/enum-roles";

export class UpdateUserDto {
    @IsNotEmpty()
    name: string;
    
    @IsEmail()
    email: string;

    roles: Array<EnumRoles>;
}
