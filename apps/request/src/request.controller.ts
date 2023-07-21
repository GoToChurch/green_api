import {Controller, Get, Inject, Logger, Req} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {GET_RESPONSE, RESULT} from "@app/common";


@Controller()
export class RequestController {
  constructor(@Inject(RESULT) private readonly resultClient: ClientProxy,
              ) {}
    private readonly logger = new Logger(RequestController.name);

    @Get("/")
    async get(@Req() request) {
        this.logger.log("Пользователь сделал GET запрос, происходит передача заголовков запроса микросервису Response");

        return this.resultClient.send(
            {
                cmd: GET_RESPONSE,
            }, {
                headers: request.headers
            },
    );
  }
}
