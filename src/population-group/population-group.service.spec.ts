import { Test, TestingModule } from '@nestjs/testing';
import { PopulationGroupService } from './population-group.service';

describe('PopulationGroupService', () => {
  let service: PopulationGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PopulationGroupService],
    }).compile();

    service = module.get<PopulationGroupService>(PopulationGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
