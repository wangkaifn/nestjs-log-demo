import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Logs } from '../logs/logs.entity';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [TypeOrmModule.forFeature([User, Logs])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
