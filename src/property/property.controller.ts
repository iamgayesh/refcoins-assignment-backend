import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';

@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  async create(@Body() dto: CreatePropertyDto) {
    try {
      const property = await this.propertyService.create(dto);
      return {
        responseCode: '00',
        responseMsg: 'Property created successfully',
        content: property,
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

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadPropertyImage(@UploadedFile() file: any) {
    if (!file) {
      return {
        responseCode: '01',
        responseMsg: 'No file uploaded',
        content: null,
        exception: 'File is required',
      };
    }

    try {
      const imageUrl = `/uploads/${file.filename}`;
      return {
        responseCode: '00',
        responseMsg: 'Property image uploaded successfully',
        content: {
          originalName: file.originalname,
          filename: file.filename,
          size: file.size,
          mimetype: file.mimetype,
          url: imageUrl,
        },
        exception: null,
      };
    } catch (error) {
      return {
        responseCode: '01',
        responseMsg: 'Failed to upload image',
        content: null,
        exception: error.message,
      };
    }
  }

  @Get()
  async findAll() {
    try {
      const properties = await this.propertyService.findAll();
      return {
        responseCode: '00',
        responseMsg: 'Properties retrieved successfully',
        content: properties,
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

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const property = await this.propertyService.findOne(id);
      if (!property) {
        return {
          responseCode: '01',
          responseMsg: 'Property not found',
          content: null,
          exception: null,
        };
      }
      return {
        responseCode: '00',
        responseMsg: 'Property retrieved successfully',
        content: property,
        exception: null,
      };
    } catch (error) {
      return {
        responseCode: '01',
        responseMsg: 'Failed to retrieve property',
        content: null,
        exception: error.message,
      };
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: Partial<CreatePropertyDto>,
  ) {
    try {
      const property = await this.propertyService.update(id, dto);
      if (!property) {
        return {
          responseCode: '01',
          responseMsg: 'Property not found',
          content: null,
          exception: null,
        };
      }
      return {
        responseCode: '00',
        responseMsg: 'Property updated successfully',
        content: property,
        exception: null,
      };
    } catch (error) {
      return {
        responseCode: '01',
        responseMsg: 'Failed to update property',
        content: null,
        exception: error.message,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      const result = await this.propertyService.remove(id);
      return {
        responseCode: '00',
        responseMsg: 'Property deleted successfully',
        content: result,
        exception: null,
      };
    } catch (error) {
      return {
        responseCode: '01',
        responseMsg: 'Failed to delete property',
        content: null,
        exception: error.message,
      };
    }
  }
}
