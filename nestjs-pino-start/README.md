## nestjs pino 日志管理

## 安装

```bash
npm install nestjs-pino --save
```

## 配置

### 创建日志文件

```typescript
// logger.ts
import { createLogger, Logger } from 'pino';
export const logger: Logger = createLogger({
  name: 'nestjs',
});
```

### 创建中间件

```typescript
// logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { logger } from './logger';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response): void {
```
