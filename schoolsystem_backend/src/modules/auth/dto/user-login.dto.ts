import { IsEmail, IsNotEmpty } from "class-validator";

export class UserLoginDto {
    @IsNotEmpty({ message: 'E-mail is required.' })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: 'Password is required.' })
    password: string;
}