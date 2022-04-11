import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { compareSync } from "bcrypt";
import { BadRequestException } from 'src/exceptions/bad-request-exception.dto';
import { UserDocument } from 'src/modules/users/schemas/user.schema';
import { UsersService } from 'src/modules/users/users.service';
import { UserLoginDto } from '../dto/user-login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async login(userLogin: UserLoginDto): Promise<any> {
        const user: UserDocument = await this.validateUser(userLogin);

        const payload = {
            sub: user._id,
            username: user.name
        };

        return this.jwtService.sign(payload);
    }

    async validateUser(userLogin: UserLoginDto): Promise<null | UserDocument> {
        const user: UserDocument = await this.usersService.findByEmail(userLogin.email);
        if (user && compareSync(userLogin.password, user.password)) {
            return user;
        } else {
            throw new BadRequestException('Password is wrong.');
        }
        return null;
    }
}
