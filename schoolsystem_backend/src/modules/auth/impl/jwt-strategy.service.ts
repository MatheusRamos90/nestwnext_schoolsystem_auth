import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy, 'jwt') {

    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService
        ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('PRIVATE_SECRET_KEY')
        });
    }

    async validate(payload: any) {
        return payload;
    }

}