import { Test, TestingModule } from '@nestjs/testing';
import { FamilyCoreService } from './family-core.service';

describe('FamilyCoreService', () => {
  let service: FamilyCoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FamilyCoreService],
    }).compile();

    service = module.get<FamilyCoreService>(FamilyCoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
