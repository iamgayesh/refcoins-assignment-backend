import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Property } from './property.schema';
import { CreatePropertyDto } from './dto/create-property.dto';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<Property>,
  ) {}

  // Create a new property
  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    const property = new this.propertyModel(createPropertyDto);
    return property.save();
  }

  // Get all properties (with populated refs)
  async findAll(): Promise<Property[]> {
    return this.propertyModel
      .find()
      .populate('propertyLocation')
      .populate('propertyType')
      .populate('propertyStatus')
      .exec();
  }

  // Get property by ID
  async findOne(propertyId: number): Promise<Property> {
    return this.propertyModel.findOne({ propertyId }).exec();
  }

  // Update property
  async update(
    propertyId: number,
    updateData: Partial<CreatePropertyDto>,
  ): Promise<Property> {
    return this.propertyModel
      .findOneAndUpdate({ propertyId }, updateData, { new: true })
      .exec();
  }

  // Delete property
  async remove(propertyId: number): Promise<{ deleted: boolean }> {
    const result = await this.propertyModel.deleteOne({ propertyId }).exec();
    return { deleted: result.deletedCount > 0 };
  }
}
