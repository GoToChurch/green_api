import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import {RESULT, RmqModule} from "@app/common";



@Module({
  imports: [
    RmqModule.registerRmq({name: RESULT}),
  ],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}
