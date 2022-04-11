import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { UserLoginDto } from '../dto/user-login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('/login')
    @HttpCode(200)
    async login(@Body() body: UserLoginDto) {
        return { access_token: await this.authService.login(body) };
    }

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    getProfile(@Req() req: any) {
        return req.user;
    }
    
}
