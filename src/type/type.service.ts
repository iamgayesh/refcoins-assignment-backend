import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Type } from './type.schema';

@Injectable()
export class TypeService {
  constructor(@InjectModel(Type.name) private typeModel: Model<Type>) {}

  // Create a new type with wrapped response
  async create(typeId: number, typeDescription: string): Promise<any> {
    // default error response
    let response = {
      responseCode: '01',
      responseMsg: 'Failed to create type',
      content: null,
      exception: null,
    };

    try {
      const type = new this.typeModel({ typeId, typeDescription });
      const saved = await type.save();

      response = {
        responseCode: '00',
        responseMsg: 'Success',
        content: saved,
        exception: null,
      };
    } catch (error) {
      response.exception = error.message;
    }

    return response;
  }

  // Get all types with wrapped response
  async findAll(): Promise<any> {
    // default error response
    let response = {
      responseCode: '01',
      responseMsg: 'Failed to retrieve types',
      content: [],
      exception: null,
    };

    try {
      const types = await this.typeModel.find().exec();

      response = {
        responseCode: '00',
        responseMsg: 'Success',
        content: types,
        exception: null,
      };
    } catch (error) {
      response.exception = error.message;
    }

    return response;
  }
}
