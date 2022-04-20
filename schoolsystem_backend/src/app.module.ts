import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigAppModule } from './config/config-app.module';
import { ConfigAppService } from './config/impl/config-app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ModulesModule } from './modules/modules.module';

const setEnv = () => {
  const configService = new ConfigService()
  const NODE_ENV = !configService.get<string>('NODE_ENV') ? undefined : configService.get<string>('NODE_ENV').trim()

  if (!NODE_ENV || NODE_ENV === 'dev') {
    return '.dev.env'
  } else if (NODE_ENV === 'prod') {
    return '.prod.env'
  }

  return undefined
}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: setEnv(),
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
