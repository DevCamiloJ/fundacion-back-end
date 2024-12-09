import { Test, TestingModule } from '@nestjs/testing';
import { EpsController } from './eps.controller';
import { EpsService } from './eps.service';

describe('EpsController', () => {
  let controller: EpsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EpsController],
      providers: [EpsService],
    }).compile();

    controller = module.get<EpsController>(EpsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
