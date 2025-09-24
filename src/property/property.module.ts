import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { Property, PropertySchema } from './property.schema';
import { Location, LocationSchema } from '../location/location.schema';
import { Type, TypeSchema } from '../type/type.schema';
import { Status, StatusSchema } from '../status/status.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Property.name, schema: PropertySchema },
      { name: Location.name, schema: LocationSchema },
      { name: Type.name, schema: TypeSchema },
      { name: Status.name, schema: StatusSchema },
    ]),
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          // Save to C:/REFCOINS directory
          cb(null, 'C:/REFCOINS');
        },
        filename: (req, file, cb) => {
          // Generate unique filename with timestamp
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtension = extname(file.originalname);
          cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
        },
      }),
      fileFilter: (req, file, cb) => {
        // Only allow image files
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
      },
    }),
  ],
  controllers: [PropertyController],
  providers: [PropertyService],
  exports: [PropertyService],
})
export class PropertyModule {}
