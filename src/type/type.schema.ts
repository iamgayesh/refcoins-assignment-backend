import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Type extends Document {
  @Prop({ required: true, unique: true })
  typeId: number;

  @Prop({ required: true })
  typeDescription: string;
}

export const TypeSchema = SchemaFactory.createForClass(Type);
