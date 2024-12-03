import { Controller, Delete, Get, Patch, Post, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  private logger = new Logger(UserController.name);

  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {
    this.logger.log('UserController init-2012');
  }

  @Get()
  getUsers(): any {
    this.logger.log(`请求getUsers成功`);
    return this.userService.findAll();
    // return this.userService.getUsers();
  }

  @Post()
  addUser(): any {
    // todo 解析Body参数
    const user = { username: 'toimc', password: '123456' } as User;
    // return this.userService.addUser();
    return this.userService.create(user);
  }
  @Patch()
  updateUser(): any {
    // todo 传递参数id
    // todo 异常处理
    const user = { username: 'newname' } as User;
    return this.userService.update(1, user);
  }

  @Delete()
  deleteUser(): any {
    // todo 传递参数id
    return this.userService.remove(1);
  }

  @Get('/profile')
  getUserProfile(): any {
    return this.userService.findProfile(2);
  }

  @Get('/logs')
  getUserLogs(): any {
    return this.userService.findUserLogs(2);
  }

  @Get('/logsByGroup')
  async getLogsByGroup(): Promise<any> {
    const res = await this.userService.findLogsByGroup(2);
    // return res.map((o) => ({
    //   result: o.result,
    //   count: o.count,
    // }));
    return res;
  }
}
