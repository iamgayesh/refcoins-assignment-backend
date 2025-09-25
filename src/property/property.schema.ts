import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Property extends Document {
  @Prop({ required: true })
  propertyId: number; // explicit numeric ID

  @Prop({ required: true })
  propertyTitle: string;

  @Prop({ required: true, unique: true })
  propertySlug: string;

  @Prop({ type: Number, required: true })
  propertyLocation: number; // refers to locationId

  @Prop()
  propertyDescription: string;

  @Prop({ required: true })
  propertyPrice: number; // LKR prefix handled in frontend

  @Prop({ type: Number, required: true })
  propertyType: number; // refers to typeId

  @Prop({ type: Number, required: true })
  propertyStatus: number; // refers to statusId

  @Prop({ required: true })
  propertyArea: number; // in sq ft

  @Prop()
  propertyImagePath: string; // path or URL

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
