import { Test, TestingModule } from '@nestjs/testing';
import { PopulationGroupController } from './population-group.controller';
import { PopulationGroupService } from './population-group.service';

describe('PopulationGroupController', () => {
  let controller: PopulationGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PopulationGroupController],
      providers: [PopulationGroupService],
    }).compile();

    controller = module.get<PopulationGroupController>(PopulationGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
