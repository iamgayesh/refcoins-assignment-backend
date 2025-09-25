import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { getModelToken } from '@nestjs/mongoose';
import { Location } from './location.schema';

describe('LocationController (Integration)', () => {
  let app: INestApplication;
  let service: LocationService;

  const mockLocationModel = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [
        LocationService,
        {
          provide: getModelToken(Location.name),
          useValue: mockLocationModel,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    service = moduleFixture.get<LocationService>(LocationService);
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET /locations', () => {
    it('should return locations in expected JSON format', async () => {
      const mockLocations = [
        {
          locationId: 1,
          locationDescription: 'Colombo',
        },
        {
          locationId: 2,
          locationDescription: 'Kandy',
        },
        {
          locationId: 3,
          locationDescription: 'Galle',
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(mockLocations as any);

      const response = await request(app.getHttpServer())
        .get('/locations')
        .expect(200);

      expect(response.body).toEqual([
        {
          locationId: 1,
          locationDescription: 'Colombo',
        },
        {
          locationId: 2,
          locationDescription: 'Kandy',
        },
        {
          locationId: 3,
          locationDescription: 'Galle',
        },
      ]);
    });

    it('should return empty array when no locations exist', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);

      const response = await request(app.getHttpServer())
        .get('/locations')
        .expect(200);

      expect(response.body).toEqual([]);
    });
  });
});
