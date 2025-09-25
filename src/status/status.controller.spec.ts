import { Test, TestingModule } from '@nestjs/testing';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
import { getModelToken } from '@nestjs/mongoose';
import { Status } from './status.schema';

describe('StatusController', () => {
  let controller: StatusController;
  let service: StatusService;

  const mockStatusModel = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusController],
      providers: [
        StatusService,
        {
          provide: getModelToken(Status.name),
          useValue: mockStatusModel,
        },
      ],
    }).compile();

    controller = module.get<StatusController>(StatusController);
    service = module.get<StatusService>(StatusService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all statuses', async () => {
      const statuses = [
        {
          statusId: 1,
          statusDescription: 'For Sale',
        },
        {
          statusId: 2,
          statusDescription: 'For Rent',
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(statuses as any);

      const result = await controller.findAll();

      expect(result).toEqual(statuses);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should return empty array when no statuses exist', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
