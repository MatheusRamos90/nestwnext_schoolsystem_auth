import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserLoginDto } from 'src/modules/users/dto/create-user-login.dto';
import { UserResponseDto } from 'src/modules/users/dto/user-response.dto';
import { UsersService } from 'src/modules/users/users.service';
import { UserLoginDto } from '../dto/user-login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService
    ) {}

    @Post('/login')
    @HttpCode(200)
    async login(@Body() body: UserLoginDto) {
        return { access_token: await this.authService.login(body) };
    }

    @Post('/new')
    @HttpCode(201)
    async create(@Body() createUserDto: CreateUserLoginDto): Promise<UserResponseDto> {
        return await this.usersService.create(createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    getProfile(@Req() req: any) {
        return req.user;
    }
    
}
