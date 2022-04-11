import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from "@nestjs/passport";
import { User, UserSchema } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { AuthController } from './impl/auth.controller';
import { AuthService } from './impl/auth.service';
import { JwtStrategyService } from './impl/jwt-strategy.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const options: JwtModuleOptions = {
          publicKey: configService.get<string>('PUBLIC_SECRET_KEY'),
          privateKey: configService.get<string>('PRIVATE_SECRET_KEY'),
          signOptions: { expiresIn: configService.get<string>('EXP_TIME') } 
        }
        return options;
      },
      inject: [ConfigService]
    }),
  ],
  providers: [AuthService, UsersService, JwtStrategyService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}