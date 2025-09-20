import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body()
    body: {
      username: string;
      password: string;
      userType: 'admin' | 'customer';
    },
  ) {
    return this.userService.create(body.username, body.password, body.userType);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
