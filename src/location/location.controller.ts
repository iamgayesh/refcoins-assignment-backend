import { Controller, Get, Post, Body } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  create(@Body() body: { locationId: number; locationDescription: string }) {
    return this.locationService.create(
      body.locationId,
      body.locationDescription,
    );
  }

  @Get()
  findAll() {
    return this.locationService.findAll();
  }
}
