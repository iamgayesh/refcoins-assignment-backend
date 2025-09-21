import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PropertyService } from './property/property.service';
import { LocationService } from './location/location.service';
import { TypeService } from './type/type.service';
import { StatusService } from './status/status.service';
import { UserService } from './user/user.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const propertyService = app.get(PropertyService);
  const locationService = app.get(LocationService);
  const typeService = app.get(TypeService);
  const statusService = app.get(StatusService);
  const userService = app.get(UserService);

  try {
    console.log('🌱 Starting database seeding...');

    // Seed Locations
    console.log('📍 Seeding locations...');
    const locations = [
      { locationId: 1, locationDescription: 'Colombo' },
      { locationId: 2, locationDescription: 'Kandy' },
      { locationId: 3, locationDescription: 'Galle' },
    ];

    for (const location of locations) {
      await locationService.create(
        location.locationId,
        location.locationDescription,
      );
      console.log(`✅ Created location: ${location.locationDescription}`);
    }

    // Seed Types
    console.log('🏠 Seeding property types...');
    const types = [
      { typeId: 1, typeDescription: 'Single Family' },
      { typeId: 2, typeDescription: 'Villa' },
    ];

    for (const type of types) {
      await typeService.create(type.typeId, type.typeDescription);
      console.log(`✅ Created type: ${type.typeDescription}`);
    }

    // Seed Statuses
    console.log('📊 Seeding property statuses...');
    const statuses = [
      { statusId: 1, statusDescription: 'For Sale' },
      { statusId: 2, statusDescription: 'For Rent' },
    ];

    for (const status of statuses) {
      await statusService.create(status.statusId, status.statusDescription);
      console.log(`✅ Created status: ${status.statusDescription}`);
    }

    // Seed Sample Properties
    console.log('🏡 Seeding sample properties...');
    const sampleProperties = [
      {
        propertyId: 1,
        propertyTitle: 'Luxury Villa in Colombo',
        propertySlug: 'luxury-villa-colombo',
        propertyLocation: 1,
        propertyDescription:
          'A beautiful luxury villa with modern amenities in the heart of Colombo.',
        propertyPrice: 15000000,
        propertyType: 2,
        propertyStatus: 1,
        propertyArea: 3500,
        propertyImagePath: '/images/villa-colombo.jpg',
      },
      {
        propertyId: 2,
        propertyTitle: 'Family Home in Kandy',
        propertySlug: 'family-home-kandy',
        propertyLocation: 2,
        propertyDescription:
          'Spacious family home perfect for growing families in peaceful Kandy.',
        propertyPrice: 8500000,
        propertyType: 1,
        propertyStatus: 1,
        propertyArea: 2500,
        propertyImagePath: '/images/home-kandy.jpg',
      },
      {
        propertyId: 3,
        propertyTitle: 'Modern Apartment in Galle',
        propertySlug: 'modern-apartment-galle',
        propertyLocation: 3,
        propertyDescription:
          'Contemporary apartment with sea view in historic Galle.',
        propertyPrice: 45000,
        propertyType: 1,
        propertyStatus: 2,
        propertyArea: 1200,
        propertyImagePath: '/images/apartment-galle.jpg',
      },
    ];

    for (const property of sampleProperties) {
      await propertyService.create(property);
      console.log(`✅ Created property: ${property.propertyTitle}`);
    }

    // Seed Admin User
    console.log('👤 Seeding admin user...');
    await userService.create('admin', 'admin123', 'admin');
    console.log('✅ Created admin user');

    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
