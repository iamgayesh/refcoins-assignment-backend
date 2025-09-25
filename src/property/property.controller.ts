import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';

@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post('create-with-image')
  @UseInterceptors(FileInterceptor('image'))
  async createWithImage(
    @UploadedFile() file: any,
    @Body() dto: CreatePropertyDto,
  ) {
    if (!file) {
      throw new BadRequestException('Property image is required');
    }

    try {
      // Create the image URL/path
      const imageUrl = `/uploads/${file.filename}`;

      // Add the image path to the DTO
      const propertyData = {
        ...dto,
        propertyImagePath: imageUrl,
      };

      const property = await this.propertyService.create(propertyData);

      return {
        responseCode: '00',
        responseMsg: 'Property created successfully with image',
        content: {
          property,
          uploadedFile: {
            originalName: file.originalname,
            filename: file.filename,
            size: file.size,
            mimetype: file.mimetype,
            url: imageUrl,
          },
        },
        exception: null,
      };
    } catch (error) {
      return {
        responseCode: '01',
        responseMsg: 'Failed to create property',
        content: null,
        exception: error.message,
      };
    }
  }

  @Get('paginated')
  async findAllPaginated(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '3',
  ) {
    try {
      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);

      const result = await this.propertyService.findAllPaginated(
        pageNum,
        limitNum,
      );
      return {
        responseCode: '00',
        responseMsg: 'Properties retrieved successfully',
        content: result.data,
        pagination: result.pagination,
        exception: null,
      };
    } catch (error) {
      return {
        responseCode: '01',
        responseMsg: 'Failed to retrieve properties',
        content: null,
        exception: error.message,
      };
    }
  }

  @Get('search')
  async searchProperties(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '3',
    @Query('locationId') locationId?: string,
    @Query('statusId') statusId?: string,
    @Query('typeId') typeId?: string,
  ) {
    try {
      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);

      const filters = {
        locationId: locationId ? parseInt(locationId, 10) : undefined,
        statusId: statusId ? parseInt(statusId, 10) : undefined,
        typeId: typeId ? parseInt(typeId, 10) : undefined,
      };

      const result = await this.propertyService.searchProperties(
        pageNum,
        limitNum,
        filters,
      );
      return {
        responseCode: '00',
        responseMsg: 'Properties searched successfully',
        content: result.data,
        pagination: result.pagination,
        exception: null,
      };
    } catch (error) {
      return {
        responseCode: '01',
        responseMsg: 'Failed to search properties',
        content: null,
        exception: error.message,
      };
    }
  }
}
