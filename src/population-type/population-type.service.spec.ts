import { Test, TestingModule } from '@nestjs/testing';
import { PopulationTypeService } from './population-type.service';

describe('PopulationTypeService', () => {
  let service: PopulationTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PopulationTypeService],
    }).compile();

    service = module.get<PopulationTypeService>(PopulationTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
