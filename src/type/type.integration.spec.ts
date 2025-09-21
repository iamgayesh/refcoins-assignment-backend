import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeController } from './type.controller';
import { TypeService } from './type.service';
import { getModelToken } from '@nestjs/mongoose';
import { Type } from './type.schema';

describe('TypeController (Integration)', () => {
  let app: INestApplication;
  let service: TypeService;

  const mockTypeModel = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [TypeController],
      providers: [
        TypeService,
        {
          provide: getModelToken(Type.name),
          useValue: mockTypeModel,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    service = moduleFixture.get<TypeService>(TypeService);
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET /types', () => {
    it('should return types in expected JSON format', async () => {
      const mockTypes = [
        {
          typeId: 1,
          typeDescription: 'Single Family',
        },
        {
          typeId: 2,
          typeDescription: 'Villa',
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(mockTypes as any);

      const response = await request(app.getHttpServer())
        .get('/types')
        .expect(200);

      expect(response.body).toEqual([
        {
          typeId: 1,
          typeDescription: 'Single Family',
        },
        {
          typeId: 2,
          typeDescription: 'Villa',
        },
      ]);
    });

    it('should return empty array when no types exist', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);

      const response = await request(app.getHttpServer())
        .get('/types')
        .expect(200);

      expect(response.body).toEqual([]);
    });
  });
});
