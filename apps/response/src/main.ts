import { NestFactory } from '@nestjs/core';
import { ResponseModule } from './response.module';
import {ConfigService} from "@nestjs/config";
import {RmqService, RABBITMQ_RESULT_QUEUE} from "@app/common";
import {Logger} from "@nestjs/common";


async function bootstrap() {
  const logger = new Logger(ResponseModule.name);

  const app = await NestFactory.create(ResponseModule);
  const configService = app.get(ConfigService);
  const commonService = app.get(RmqService);
  const queue = configService.get(RABBITMQ_RESULT_QUEUE);

  app.connectMicroservice(commonService.getRmqOptions(queue, true));
  await app.startAllMicroservices();

  logger.log("Микросервис Response успешно запущен")
}
bootstrap();
