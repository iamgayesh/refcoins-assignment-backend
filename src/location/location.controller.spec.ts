import { Test, TestingModule } from '@nestjs/testing';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { getModelToken } from '@nestjs/mongoose';
import { Location } from './location.schema';

describe('LocationController', () => {
  let controller: LocationController;
  let service: LocationService;

  const mockLocation = {
    _id: '64a7b8c9d1e2f3a4b5c6d7e8',
    locationId: 1,
    locationDescription: 'Colombo',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockLocationModel = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [
        LocationService,
        {
          provide: getModelToken(Location.name),
          useValue: mockLocationModel,
        },
      ],
    }).compile();

    controller = module.get<LocationController>(LocationController);
    service = module.get<LocationService>(LocationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all locations', async () => {
      const locations = [
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

      jest.spyOn(service, 'findAll').mockResolvedValue(locations as any);

      const result = await controller.findAll();

      expect(result).toEqual(locations);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should return empty array when no locations exist', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
