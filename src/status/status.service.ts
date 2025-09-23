import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Status } from './status.schema';

@Injectable()
export class StatusService {
  constructor(@InjectModel(Status.name) private statusModel: Model<Status>) {}

  // Create a new status with wrapped response
  async create(statusId: number, statusDescription: string): Promise<any> {
    // default error response
    let response = {
      responseCode: '01',
      responseMsg: 'Failed to create status',
      content: null,
      exception: null,
    };

    try {
      const status = new this.statusModel({ statusId, statusDescription });
      const saved = await status.save();

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

  // Get all statuses with wrapped response
  async findAll(): Promise<any> {
    // default error response
    let response = {
      responseCode: '01',
      responseMsg: 'Failed to retrieve statuses',
      content: [],
      exception: null,
    };

    try {
      const statuses = await this.statusModel.find().exec();

      response = {
        responseCode: '00',
        responseMsg: 'Success',
        content: statuses,
        exception: null,
      };
    } catch (error) {
      response.exception = error.message;
    }

    return response;
  }
}
