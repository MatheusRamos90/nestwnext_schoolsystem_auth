import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './config/impl/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  
  // get environments
  const configService = app.get(ConfigService);
  const PORT = configService.get<string>('PORT');

  // config global validator
  app.useGlobalPipes(new ValidationPipe());

  // config global filters to exception's treatment
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new GlobalExceptionFilter(httpAdapter));

  await app.listen(PORT, () => {
    console.log(`Environment: ${configService.get<string>('NODE_ENV')}`);
    console.log(`PublicSecret ${configService.get<string>('PUBLIC_SECRET_KEY')}`);
    console.log(`Server is running on port ${PORT}`)
  });
}
bootstrap();
