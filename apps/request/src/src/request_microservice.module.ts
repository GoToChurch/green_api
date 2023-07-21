import { Module } from '@nestjs/common';
import { RequestMicroserviceController } from './request_microservice.controller';
import { RequestMicroserviceService } from './request_microservice.service';
import {RESULT, RmqModule} from "@app/common";



@Module({
  imports: [
    RmqModule.registerRmq({name: RESULT}),
  ],
  controllers: [RequestMicroserviceController],
  providers: [RequestMicroserviceService],
})
export class RequestMicroserviceModule {}
