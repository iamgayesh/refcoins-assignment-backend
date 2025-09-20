import { Controller, Get, Post, Body } from '@nestjs/common';
import { TypeService } from './type.service';

@Controller('types')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Post()
  create(@Body() body: { typeId: number; typeDescription: string }) {
    return this.typeService.create(body.typeId, body.typeDescription);
  }

  @Get()
  findAll() {
    return this.typeService.findAll();
  }
}
