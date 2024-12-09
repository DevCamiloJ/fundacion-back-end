import { Test, TestingModule } from '@nestjs/testing';
import { PopulationTypeController } from './population-type.controller';
import { PopulationTypeService } from './population-type.service';

describe('PopulationTypeController', () => {
  let controller: PopulationTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PopulationTypeController],
      providers: [PopulationTypeService],
    }).compile();

    controller = module.get<PopulationTypeController>(PopulationTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
