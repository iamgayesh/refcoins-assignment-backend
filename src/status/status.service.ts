import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Status } from './status.schema';

@Injectable()
export class StatusService {
  constructor(@InjectModel(Status.name) private statusModel: Model<Status>) {}

  // Create a new status
  async create(statusId: number, statusDescription: string): Promise<Status> {
    const status = new this.statusModel({ statusId, statusDescription });
    return status.save();
  }

  // Get all statuses
  async findAll(): Promise<Status[]> {
    return this.statusModel.find().exec();
  }
}
