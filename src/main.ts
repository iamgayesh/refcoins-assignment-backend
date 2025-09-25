import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve C:/REFCOINS folder as /uploads
  app.useStaticAssets('C:/REFCOINS', {
    prefix: '/uploads/', // URLs will start with /uploads/
  });

  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:5000'], // Add your frontend URLs
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 7000);
}
bootstrap();
