import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './user/user.module';
import { PropertyModule } from './property/property.module';
import { LocationsModule } from './location/location.module';
import { TypesModule } from './type/type.module';
import { StatusesModule } from './status/status.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/refcoinsDB',
    ),
    PropertyModule,
    UsersModule,
    LocationsModule,
    TypesModule,
    StatusesModule,
  ],
})
export class AppModule {}
