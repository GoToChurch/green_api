import {Controller, Logger} from '@nestjs/common';
import { ResponseService } from './response.service';
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {GET_RESPONSE, RmqService} from "@app/common";


@Controller()
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  private readonly logger = new Logger(ResponseController.name);

  @MessagePattern({ cmd: GET_RESPONSE })
  async get(@Ctx() context: RmqContext,
            @Payload() payload) {
    this.logger.log(`Микросервис Response получил заголовки запроса от микросервиса Request, происходит 
    передача заголовков обработчику`);

    return this.responseService.get(payload.headers);
  }
}
