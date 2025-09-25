import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreatePropertyDto {
  @IsOptional()
  @IsNumber()
  propertyId?: number; // Auto-generated, so optional

  @IsNotEmpty()
  @IsString()
  propertyTitle: string;

  @IsNotEmpty()
  @IsString()
  propertySlug: string;

  @IsNotEmpty()
  @IsNumber()
  propertyLocation: number; // refers to locationId

  @IsString()
  propertyDescription?: string;

  @IsNotEmpty()
  @IsNumber()
  propertyPrice: number;

  @IsNotEmpty()
  @IsNumber()
  propertyType: number; // refers to typeId

  @IsNotEmpty()
  @IsNumber()
  propertyStatus: number; // refers to statusId

  @IsNotEmpty()
  @IsNumber()
  propertyArea: number;

  @IsString()
  propertyImagePath?: string;
}
