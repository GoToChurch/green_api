import { NestFactory } from '@nestjs/core';
import {ConfigService} from '@nestjs/config'
import { RequestModule } from './request.module';
import {PORT} from "@app/common";
import {Logger} from "@nestjs/common";

async function bootstrap() {
  const logger = new Logger(RequestModule.name);

  const app = await NestFactory.create(RequestModule);
  const configService = app.get(ConfigService);

  await app.listen(configService.get(PORT), () =>
      logger.log(`Микросервис Request запущен на порту ${configService.get(PORT)}`));
}
bootstrap();
