import { Test, TestingModule } from '@nestjs/testing';
import { MunicipioController } from './municipio.controller';
import { MunicipioService } from './municipio.service';

describe('MunicipioController', () => {
  let controller: MunicipioController;
  let service: MunicipioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MunicipioController],
      providers: [
        {
          provide: MunicipioService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findByDepartamento: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MunicipioController>(MunicipioController);
    service = module.get<MunicipioService>(MunicipioService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

});
