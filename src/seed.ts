import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LocationService } from './location/location.service';
import { TypeService } from './type/type.service';
import { StatusService } from './status/status.service';
import { UserService } from './user/user.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

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

    // Seed Admin User
    console.log('👤 Seeding admin user...');
    await userService.create('admin', 'admin123', 'ADMIN');
    console.log('✅ Created admin user');

    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
