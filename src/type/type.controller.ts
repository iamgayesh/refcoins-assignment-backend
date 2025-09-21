import { Controller, Get } from '@nestjs/common';
import { TypeService } from './type.service';

@Controller('types')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get()
  findAll() {
    return this.typeService.findAll();
  }
}
