// Copyright (c) 2022 toimc<admin@wayearn.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule, {
    // 关闭整个nestjs日志
    // logger: false,
    // logger: ['error', 'warn'],
    bufferLogs: true,
  });
  app.setGlobalPrefix('api/v1');

  const port = 3000;
  await app.listen(port);

  logger.log(`App 运行在：${port}`);
  // logger.warn(`App 运行在：${port}`);
  // logger.error(`App 运行在：${port}`);
}
bootstrap();
