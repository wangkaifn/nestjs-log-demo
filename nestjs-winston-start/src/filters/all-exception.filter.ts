import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  LoggerService,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import * as requestIp from 'request-ip';

export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: LoggerService,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message || exception.getResponse(),
      ip: requestIp.getClientIp(request),
    };

    this.logger.error('[akai]', responseBody);
    // 用于向客户端发送 HTTP 响应。这个方法是 HttpAdapter 类的一部分，用于处理 HTTP 请求。
    this.httpAdapterHost.httpAdapter.reply(response, responseBody, httpStatus);
  }
}
