import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body()
    body: {
      username: string;
      password: string;
      userType: 'ADMIN' | 'CUSTOMER';
    },
  ) {
    return this.userService.create(body.username, body.password, body.userType);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile() {
    return {
      responseCode: '00',
      responseMsg: 'Profile access successful',
      content: { message: 'This is a protected route!' },
      exception: null,
    };
  }
}
