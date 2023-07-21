import { Module } from '@nestjs/common';
import { ResponseController } from './response.controller';
import { ResponseService } from './response.service';
import {RmqModule} from "@app/common";

@Module({
  imports: [
      RmqModule
  ],
  controllers: [ResponseController],
  providers: [ResponseService],
})
export class ResponseModule {}
