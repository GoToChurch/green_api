import {Injectable, Logger} from '@nestjs/common';

@Injectable()
export class ResponseService {
    private readonly logger = new Logger(ResponseService.name);

    async get(headers) {
      this.logger.log("Обработчик получил заголовки и возвращает их пользователю");

      return headers;
  }
}
