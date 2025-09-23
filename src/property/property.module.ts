import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { Property, PropertySchema } from './property.schema';
import { Location, LocationSchema } from '../location/location.schema';
import { Type, TypeSchema } from '../type/type.schema';
import { Status, StatusSchema } from '../status/status.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Property.name, schema: PropertySchema },
      { name: Location.name, schema: LocationSchema },
      { name: Type.name, schema: TypeSchema },
      { name: Status.name, schema: StatusSchema },
    ]),
  ],
  controllers: [PropertyController],
  providers: [PropertyService],
  exports: [PropertyService],
})
export class PropertyModule {}
