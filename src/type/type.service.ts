import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Type } from './type.schema';

@Injectable()
export class TypeService {
  constructor(@InjectModel(Type.name) private typeModel: Model<Type>) {}

  // Create a new type
  async create(typeId: number, typeDescription: string): Promise<Type> {
    const type = new this.typeModel({ typeId, typeDescription });
    return type.save();
  }

  // Get all types
  async findAll(): Promise<Type[]> {
    return this.typeModel.find().exec();
  }
}
