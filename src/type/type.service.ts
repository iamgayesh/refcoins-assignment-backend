import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Type } from './type.schema';

@Injectable()
export class TypeService {
  constructor(@InjectModel(Type.name) private typeModel: Model<Type>) {}

  async findAll(): Promise<Type[]> {
    return this.typeModel.find().exec();
  }
}
