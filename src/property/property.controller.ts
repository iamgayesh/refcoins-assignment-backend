import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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

  // Combined endpoint - Create property with image upload
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

  @Get()
  async findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    try {
      // Check if pagination parameters are provided
      if (page || limit) {
        const pageNum = parseInt(page || '1', 10);
        const limitNum = parseInt(limit || '3', 10);

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
      } else {
        // Return all properties without pagination
        const properties = await this.propertyService.findAll();
        return {
          responseCode: '00',
          responseMsg: 'Properties retrieved successfully',
          content: properties,
          exception: null,
        };
      }
    } catch (error) {
      return {
        responseCode: '01',
        responseMsg: 'Failed to retrieve properties',
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
