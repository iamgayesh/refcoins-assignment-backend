import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location } from './location.schema';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<Location>,
  ) {}

  async create(
    locationId: number,
    locationDescription: string,
  ): Promise<Location> {
    const location = new this.locationModel({
      locationId,
      locationDescription,
    });
    return location.save();
  }

  async findAll(): Promise<Location[]> {
    return this.locationModel.find().exec();
  }
}
