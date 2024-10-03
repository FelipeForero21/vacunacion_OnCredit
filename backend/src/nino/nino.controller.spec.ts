import { Test, TestingModule } from '@nestjs/testing';
import { NinoController } from './nino.controller';
import { NinoService } from './nino.service';

describe('NinoController', () => {
  let controller: NinoController;
  let service: NinoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NinoController],
      providers: [
        {
          provide: NinoService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findByMunicipio: jest.fn(),
            updateMunicipio: jest.fn(),
            resumenPorMunicipio: jest.fn(),
            promedioEdadPorMunicipio: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<NinoController>(NinoController);
    service = module.get<NinoService>(NinoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

});
