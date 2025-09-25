import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  getTest() {
    return {
      responseCode: '00',
      responseMsg: 'Success',
      content: { message: 'Backend is working with CORS!' },
      exception: null,
    };
  }
}
