import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Property } from './property.schema';
import { CreatePropertyDto } from './dto/create-property.dto';
import { Location } from '../location/location.schema';
import { Type } from '../type/type.schema';
import { Status } from '../status/status.schema';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<Property>,
    @InjectModel(Location.name) private locationModel: Model<Location>,
    @InjectModel(Type.name) private typeModel: Model<Type>,
    @InjectModel(Status.name) private statusModel: Model<Status>,
  ) {}

  // Create a new property
  async create(createPropertyDto: CreatePropertyDto): Promise<any> {
    try {
      // Get the next available propertyId
      const lastProperty = await this.propertyModel
        .findOne()
        .sort({ propertyId: -1 })
        .exec();

      const nextPropertyId = lastProperty ? lastProperty.propertyId + 1 : 1;

      // Create property with auto-generated ID
      const propertyData = {
        ...createPropertyDto,
        propertyId: nextPropertyId,
      };

      const property = new this.propertyModel(propertyData);
      const savedProperty = await property.save();

      // Return the property with lookup data
      const location = await this.locationModel
        .findOne({ locationId: savedProperty.propertyLocation })
        .exec();

      const type = await this.typeModel
        .findOne({ typeId: savedProperty.propertyType })
        .exec();

      const status = await this.statusModel
        .findOne({ statusId: savedProperty.propertyStatus })
        .exec();

      return {
        propertyId: savedProperty.propertyId,
        propertyTitle: savedProperty.propertyTitle,
        propertySlug: savedProperty.propertySlug,
        propertyLocation: location
          ? {
              locationId: location.locationId,
              locationDescription: location.locationDescription,
            }
          : null,
        propertyDescription: savedProperty.propertyDescription,
        propertyPrice: savedProperty.propertyPrice,
        propertyType: type
          ? {
              typeId: type.typeId,
              typeDescription: type.typeDescription,
            }
          : null,
        propertyStatus: status
          ? {
              statusId: status.statusId,
              statusDescription: status.statusDescription,
            }
          : null,
        propertyArea: savedProperty.propertyArea,
        propertyImagePath: savedProperty.propertyImagePath,
        imageUrl: savedProperty.propertyImagePath
          ? `http://localhost:7000${savedProperty.propertyImagePath}`
          : null,
        createdAt: savedProperty.createdAt,
        updatedAt: savedProperty.updatedAt,
      };
    } catch (error) {
      throw new Error(`Failed to create property: ${error.message}`);
    }
  }

  // Get all properties with manual lookups (non-paginated)
  async findAll(): Promise<any[]> {
    try {
      const properties = await this.propertyModel.find().exec();

      // Manually lookup related data
      const propertiesWithLookups = await Promise.all(
        properties.map(async (property) => {
          const location = await this.locationModel
            .findOne({ locationId: property.propertyLocation })
            .exec();

          const type = await this.typeModel
            .findOne({ typeId: property.propertyType })
            .exec();

          const status = await this.statusModel
            .findOne({ statusId: property.propertyStatus })
            .exec();

          return {
            propertyId: property.propertyId,
            propertyTitle: property.propertyTitle,
            propertySlug: property.propertySlug,
            propertyLocation: location
              ? {
                  locationId: location.locationId,
                  locationDescription: location.locationDescription,
                }
              : null,
            propertyDescription: property.propertyDescription,
            propertyPrice: property.propertyPrice,
            propertyType: type
              ? {
                  typeId: type.typeId,
                  typeDescription: type.typeDescription,
                }
              : null,
            propertyStatus: status
              ? {
                  statusId: status.statusId,
                  statusDescription: status.statusDescription,
                }
              : null,
            propertyArea: property.propertyArea,
            propertyImagePath: property.propertyImagePath,
            imageUrl: property.propertyImagePath
              ? `http://localhost:7000${property.propertyImagePath}`
              : null,
            createdAt: property.createdAt,
            updatedAt: property.updatedAt,
          };
        }),
      );

      return propertiesWithLookups;
    } catch (error) {
      throw new Error(`Failed to fetch properties: ${error.message}`);
    }
  }

  // Get properties with pagination (3 per page)
  async findAllPaginated(page: number = 1, limit: number = 3): Promise<any> {
    try {
      const skip = (page - 1) * limit;

      // Get total count
      const totalCount = await this.propertyModel.countDocuments().exec();
      const totalPages = Math.ceil(totalCount / limit);

      // Get paginated properties
      const properties = await this.propertyModel
        .find()
        .sort({ createdAt: -1 }) // Sort by newest first
        .skip(skip)
        .limit(limit)
        .exec();

      // Manually lookup related data
      const propertiesWithLookups = await Promise.all(
        properties.map(async (property) => {
          const location = await this.locationModel
            .findOne({ locationId: property.propertyLocation })
            .exec();

          const type = await this.typeModel
            .findOne({ typeId: property.propertyType })
            .exec();

          const status = await this.statusModel
            .findOne({ statusId: property.propertyStatus })
            .exec();

          return {
            propertyId: property.propertyId,
            propertyTitle: property.propertyTitle,
            propertySlug: property.propertySlug,
            propertyLocation: location
              ? {
                  locationId: location.locationId,
                  locationDescription: location.locationDescription,
                }
              : null,
            propertyDescription: property.propertyDescription,
            propertyPrice: property.propertyPrice,
            propertyType: type
              ? {
                  typeId: type.typeId,
                  typeDescription: type.typeDescription,
                }
              : null,
            propertyStatus: status
              ? {
                  statusId: status.statusId,
                  statusDescription: status.statusDescription,
                }
              : null,
            propertyArea: property.propertyArea,
            propertyImagePath: property.propertyImagePath,
            imageUrl: property.propertyImagePath
              ? `http://localhost:7000${property.propertyImagePath}`
              : null,
            createdAt: property.createdAt,
            updatedAt: property.updatedAt,
          };
        }),
      );

      return {
        data: propertiesWithLookups,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalItems: totalCount,
          itemsPerPage: limit,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      };
    } catch (error) {
      throw new Error(`Failed to fetch properties: ${error.message}`);
    }
  }

  // Get property by ID
  async findOne(propertyId: number): Promise<any> {
    try {
      const property = await this.propertyModel.findOne({ propertyId }).exec();

      if (!property) {
        return null;
      }

      // Manually lookup related data
      const location = await this.locationModel
        .findOne({ locationId: property.propertyLocation })
        .exec();

      const type = await this.typeModel
        .findOne({ typeId: property.propertyType })
        .exec();

      const status = await this.statusModel
        .findOne({ statusId: property.propertyStatus })
        .exec();

      return {
        propertyId: property.propertyId,
        propertyTitle: property.propertyTitle,
        propertySlug: property.propertySlug,
        propertyLocation: location
          ? {
              locationId: location.locationId,
              locationDescription: location.locationDescription,
            }
          : null,
        propertyDescription: property.propertyDescription,
        propertyPrice: property.propertyPrice,
        propertyType: type
          ? {
              typeId: type.typeId,
              typeDescription: type.typeDescription,
            }
          : null,
        propertyStatus: status
          ? {
              statusId: status.statusId,
              statusDescription: status.statusDescription,
            }
          : null,
        propertyArea: property.propertyArea,
        propertyImagePath: property.propertyImagePath,
        imageUrl: property.propertyImagePath
          ? `http://localhost:7000${property.propertyImagePath}`
          : null,
        createdAt: property.createdAt,
        updatedAt: property.updatedAt,
      };
    } catch (error) {
      throw new Error(`Failed to fetch property: ${error.message}`);
    }
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
