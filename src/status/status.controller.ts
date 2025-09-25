import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { StatusService } from './status.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('statuses')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @UseGuards(JwtAuthGuard) // Protect creation endpoint - requires JWT token
  @Post()
  create(@Body() body: { statusId: number; statusDescription: string }) {
    return this.statusService.create(body.statusId, body.statusDescription);
  }

  @Get() // Public endpoint - no protection needed for reading statuses
  findAll() {
    return this.statusService.findAll();
  }
}
