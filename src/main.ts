import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
//import { LoggerInterceptor } from './interceptors/logger/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalInterceptors(new LoggerInterceptor());
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
