import {ConfigModule, ConfigService} from "@nestjs/config";
import {DynamicModule, Module} from "@nestjs/common";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {RABBITMQ_URI} from "@app/common/consts";
import {RmqService} from "@app/common/rmq.service";


interface CommonModuleOptions {
    name: string;
}

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: "./.env",
        }),
    ],
    providers: [RmqService],
    exports: [RmqService],
})
export class RmqModule {
    static registerRmq({ name }: CommonModuleOptions): DynamicModule {
        return {
            module: RmqModule,
            imports: [
                ClientsModule.registerAsync([
                    {
                        name,
                        useFactory: (configService: ConfigService) => ({
                            transport: Transport.RMQ,
                            options: {
                                urls: [configService.get<string>(RABBITMQ_URI)],
                                queue: configService.get<string>(`RABBITMQ_${name}_QUEUE`),
                                noAck: false,
                                persistent: true,
                                queueOptions: {
                                    durable: true,
                                },
                            },
                        }),
                        inject: [ConfigService],
                    },
                ]),
            ],
            exports: [ClientsModule],
        };
    }
}