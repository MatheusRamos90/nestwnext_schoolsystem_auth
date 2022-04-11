import { Global, Module } from "@nestjs/common";
import { ConfigAppService } from "./impl/config-app.service";

@Global()
@Module({
    providers: [
        {
            provide: ConfigAppService,
            useValue: new ConfigAppService()
        }
    ],
    exports: [ConfigAppService]
})
export class ConfigAppModule {}