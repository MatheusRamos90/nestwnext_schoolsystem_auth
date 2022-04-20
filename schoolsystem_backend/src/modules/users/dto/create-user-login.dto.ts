import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserLoginDto {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    repassword: string
}
