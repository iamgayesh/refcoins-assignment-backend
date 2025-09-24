import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './user/user.module';
import { PropertyModule } from './property/property.module';
import { LocationsModule } from './location/location.module';
import { TypesModule } from './type/type.module';
import { StatusesModule } from './status/status.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: 'C:\\REFCOINS',
      serveRoot: '/uploads',
    }),
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/refcoinsDB',
      {
        ssl: process.env.MONGO_URI?.includes('mongodb+srv') ? true : false,
        tlsAllowInvalidCertificates: process.env.NODE_ENV === 'development',
        serverSelectionTimeoutMS: 30000, // 30 seconds
        socketTimeoutMS: 45000, // 45 seconds
      },
    ),
    AuthModule,
    PropertyModule,
    UsersModule,
    LocationsModule,
    TypesModule,
    StatusesModule,
  ],
})
export class AppModule {}
