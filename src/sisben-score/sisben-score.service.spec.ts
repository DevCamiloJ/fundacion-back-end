import { Test, TestingModule } from '@nestjs/testing';
import { SisbenScoreService } from './sisben-score.service';

describe('SisbenScoreService', () => {
  let service: SisbenScoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SisbenScoreService],
    }).compile();

    service = module.get<SisbenScoreService>(SisbenScoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
