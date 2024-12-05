// Copyright (c) 2022 toimc<admin@wayearn.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Logger } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as winston from 'winston';
import { WinstonModule } from 'nest-winston';
import { createLogger } from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import 'winston-daily-rotate-file';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AllExceptionFilter } from './filters/all-exception.filter';

const winstonLogformFormat: winston.Logform.Format[] = [
  winston.format.timestamp(),
  winston.format.ms(),
  nestWinstonModuleUtilities.format.nestLike('nest-winston', {
    colors: true, // 是否显示颜色
    // prettyPrint: true, // 是否格式化输出
    // processId: true, // 是否显示进程ID
    appName: true, // 是否显示应用名称
  }),
];
const instance = createLogger({
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(...winstonLogformFormat),
    }),
    new winston.transports.DailyRotateFile({
      dirname: 'logs',
      level: 'warn',
      filename: 'application-%DATE%.log', // 文件名
      datePattern: 'YYYY-MM-DD-HH', // 时间格式
      zippedArchive: true, /// 是否归档 压缩
      maxSize: '20m', // 文件大小
      maxFiles: '14d', // 文件数量
      format: winston.format.combine(
        ...winstonLogformFormat,
        winston.format.simple(),
      ),
    }),
    new winston.transports.DailyRotateFile({
      dirname: 'logs',
      level: 'info',
      filename: 'info-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      format: winston.format.combine(
        ...winstonLogformFormat,
        winston.format.simple(),
      ),
    }),
  ],
});
async function bootstrap() {
  const logger = WinstonModule.createLogger({
    // options (same as WinstonModule.forRoot() options)
    instance,
  });
  const app = await NestFactory.create(AppModule, {
    logger,
  });
  app.setGlobalPrefix('api/v1');
  const httpAdapter = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionFilter(logger, httpAdapter));
  // app.useGlobalFilters(new HttpExceptionFilter(logger));

  const port = 3000;
  await app.listen(port);

  logger.log(`App 运行在：${port}`);
  // logger.warn(`App 运行在：${port}`);
  // logger.error(`App 运行在：${port}`);
}
bootstrap();
