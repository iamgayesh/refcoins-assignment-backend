import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  BadRequestException,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('single')
  @UseInterceptors(FileInterceptor('image'))
  async uploadSingle(@UploadedFile() file: any) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const result = this.uploadService.processUploadedFile(file);

    return {
      responseCode: '00',
      responseMsg: 'File uploaded successfully',
      content: result,
      exception: null,
    };
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('images', 10)) // Max 10 files
  async uploadMultiple(@UploadedFiles() files: any[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    const results = files.map((file) =>
      this.uploadService.processUploadedFile(file),
    );

    return {
      responseCode: '00',
      responseMsg: 'Files uploaded successfully',
      content: results,
      exception: null,
    };
  }

  @Get('image/:filename')
  async getImage(@Param('filename') filename: string, @Res() res: Response) {
    return this.uploadService.getImage(filename, res);
  }
}
