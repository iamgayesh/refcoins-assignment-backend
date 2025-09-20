import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Status, StatusSchema } from './status.schema';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Status.name, schema: StatusSchema }]),
  ],
  providers: [StatusService],
  controllers: [StatusController],
  exports: [StatusService],
})
export class StatusesModule {}
