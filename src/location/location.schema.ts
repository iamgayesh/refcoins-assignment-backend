import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Location extends Document {
  @Prop({ required: true, unique: true })
  locationId: string;

  @Prop({ required: true })
  locationDescription: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
