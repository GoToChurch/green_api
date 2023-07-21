import { NestFactory } from '@nestjs/core';
import {ConfigService} from '@nestjs/config'
import { RequestMicroserviceModule } from './request_microservice.module';
import {PORT} from "@app/common";

async function bootstrap() {
  const app = await NestFactory.create(RequestMicroserviceModule);
  const configService = app.get(ConfigService);

  await app.listen(configService.get(PORT), () =>
      console.log(`GateWay запущен на порту ${configService.get('API_PORT')}`));
}
bootstrap();
