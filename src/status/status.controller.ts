import { Controller, Get, Post, Body } from '@nestjs/common';
import { StatusService } from './status.service';

@Controller('statuses')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  create(@Body() body: { statusId: number; statusDescription: string }) {
    return this.statusService.create(body.statusId, body.statusDescription);
  }

  @Get()
  findAll() {
    return this.statusService.findAll();
  }
}
