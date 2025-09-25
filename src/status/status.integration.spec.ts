import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
import { getModelToken } from '@nestjs/mongoose';
import { Status } from './status.schema';

describe('StatusController (Integration)', () => {
  let app: INestApplication;
  let service: StatusService;

  const mockStatusModel = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [StatusController],
      providers: [
        StatusService,
        {
          provide: getModelToken(Status.name),
          useValue: mockStatusModel,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    service = moduleFixture.get<StatusService>(StatusService);
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET /statuses', () => {
    it('should return statuses in expected JSON format', async () => {
      const mockStatuses = [
        {
          statusId: 1,
          statusDescription: 'For Sale',
        },
        {
          statusId: 2,
          statusDescription: 'For Rent',
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(mockStatuses as any);

      const response = await request(app.getHttpServer())
        .get('/statuses')
        .expect(200);

      expect(response.body).toEqual([
        {
          statusId: 1,
          statusDescription: 'For Sale',
        },
        {
          statusId: 2,
          statusDescription: 'For Rent',
        },
      ]);
    });

    it('should return empty array when no statuses exist', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);

      const response = await request(app.getHttpServer())
        .get('/statuses')
        .expect(200);

      expect(response.body).toEqual([]);
    });
  });
});
