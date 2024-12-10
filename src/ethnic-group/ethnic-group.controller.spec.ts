import { Test, TestingModule } from '@nestjs/testing';
import { EthnicGroupController } from './ethnic-group.controller';
import { EthnicGroupService } from './ethnic-group.service';

describe('EthnicGroupController', () => {
  let controller: EthnicGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EthnicGroupController],
      providers: [EthnicGroupService],
    }).compile();

    controller = module.get<EthnicGroupController>(EthnicGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
