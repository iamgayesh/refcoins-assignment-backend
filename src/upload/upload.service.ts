import { Injectable, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class UploadService {
  private readonly uploadPath = 'C:/REFCOINS';

  processUploadedFile(file: any) {
    const fileUrl = `/uploads/${file.filename}`;

    return {
      originalName: file.originalname,
      filename: file.filename,
      size: file.size,
      mimetype: file.mimetype,
      path: file.path,
      url: fileUrl, // This will be served by ServeStaticModule
    };
  }

  async getImage(filename: string, res: Response) {
    const filePath = path.join(this.uploadPath, filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Image not found');
    }

    // Set appropriate headers
    const ext = path.extname(filename).toLowerCase();
    let contentType = 'image/jpeg'; // default

    switch (ext) {
      case '.png':
        contentType = 'image/png';
        break;
      case '.gif':
        contentType = 'image/gif';
        break;
      case '.webp':
        contentType = 'image/webp';
        break;
      case '.jpg':
      case '.jpeg':
      default:
        contentType = 'image/jpeg';
        break;
    }

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year cache

    return res.sendFile(filePath);
  }

  async deleteImage(filename: string): Promise<boolean> {
    const filePath = path.join(this.uploadPath, filename);

    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  }

  getImageUrl(filename: string): string {
    return `/uploads/${filename}`;
  }
}
