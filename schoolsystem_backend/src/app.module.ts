import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigAppModule } from './config/config-app.module';
import { ConfigAppService } from './config/impl/config-app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.dev.env`,
      isGlobal: true
    }),
    ConfigAppModule,
    MongooseModule.forRootAsync({
      inject: [ConfigAppService],
      useFactory: async (configAppService: ConfigAppService) => configAppService.getMongoConfig()
    }),
    ModulesModule,
    AuthModule],
  controllers: []
})
export class AppModule {}
