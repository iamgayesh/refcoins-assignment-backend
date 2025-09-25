import { Test, TestingModule } from '@nestjs/testing';
import { TypeController } from './type.controller';
import { TypeService } from './type.service';
import { getModelToken } from '@nestjs/mongoose';
import { Type } from './type.schema';

describe('TypeController', () => {
  let controller: TypeController;
  let service: TypeService;

  const mockTypeModel = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeController],
      providers: [
        TypeService,
        {
          provide: getModelToken(Type.name),
          useValue: mockTypeModel,
        },
      ],
    }).compile();

    controller = module.get<TypeController>(TypeController);
    service = module.get<TypeService>(TypeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all types', async () => {
      const types = [
        {
          typeId: 1,
          typeDescription: 'Single Family',
        },
        {
          typeId: 2,
          typeDescription: 'Villa',
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(types as any);

      const result = await controller.findAll();

      expect(result).toEqual(types);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should return empty array when no types exist', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
