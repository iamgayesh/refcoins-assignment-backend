import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreatePropertyDto {
  @IsNotEmpty()
  @IsNumber()
  propertyId: number;

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
