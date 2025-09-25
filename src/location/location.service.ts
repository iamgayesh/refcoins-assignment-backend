import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location } from './location.schema';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<Location>,
  ) {}

  // Create a new location with wrapped response
  async create(locationId: number, locationDescription: string): Promise<any> {
    // default error response
    let response = {
      responseCode: '01',
      responseMsg: 'Failed to create location',
      content: null,
      exception: null,
    };

    try {
      const location = new this.locationModel({
        locationId,
        locationDescription,
      });
      const saved = await location.save();

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

  // Get all locations with wrapped response
  async findAll(): Promise<any> {
    // default error response
    let response = {
      responseCode: '01',
      responseMsg: 'Failed to retrieve locations',
      content: [],
      exception: null,
    };

    try {
      const locations = await this.locationModel.find().exec();

      response = {
        responseCode: '00',
        responseMsg: 'Success',
        content: locations,
        exception: null,
      };
    } catch (error) {
      response.exception = error.message;
    }

    return response;
  }
}
