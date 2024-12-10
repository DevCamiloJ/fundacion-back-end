import { Test, TestingModule } from '@nestjs/testing';
import { FamilyCoreController } from './family-core.controller';
import { FamilyCoreService } from './family-core.service';

describe('FamilyCoreController', () => {
  let controller: FamilyCoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FamilyCoreController],
      providers: [FamilyCoreService],
    }).compile();

    controller = module.get<FamilyCoreController>(FamilyCoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
