import { ConfigService } from '@nestjs/config';
import {Injectable} from "@nestjs/common";
import {RmqOptions, Transport} from "@nestjs/microservices";
import {RABBITMQ_URI} from "@app/common/consts";


@Injectable()
export class RmqService {
    constructor(private readonly configService: ConfigService) {}

    getRmqOptions(queue: string, noAck = false): RmqOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: [this.configService.get<string>(RABBITMQ_URI)],
                queue,
                noAck,
                persistent: true,
                queueOptions: {
                    durable: true,
                },
            },
        };
    }
}