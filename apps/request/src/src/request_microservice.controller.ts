import {Controller, Get, Inject, Res} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {GET_RESPONSE, RESULT} from "@app/common";


@Controller()
export class RequestMicroserviceController {
  constructor(@Inject(RESULT) private readonly awardClient: ClientProxy) {}

  @Get("/")
  async get(@Res() response) {
    return this.awardClient.send(
        {
          cmd: GET_RESPONSE,
        }, {
            response: JSON.stringify(response)
        },
    );
  }
}
