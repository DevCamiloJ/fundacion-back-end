import { Test, TestingModule } from '@nestjs/testing';
import { SisbenScoreController } from './sisben-score.controller';
import { SisbenScoreService } from './sisben-score.service';

describe('SisbenScoreController', () => {
  let controller: SisbenScoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SisbenScoreController],
      providers: [SisbenScoreService],
    }).compile();

    controller = module.get<SisbenScoreController>(SisbenScoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
