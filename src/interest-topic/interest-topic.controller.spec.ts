import { Test, TestingModule } from '@nestjs/testing';
import { InterestTopicController } from './interest-topic.controller';
import { InterestTopicService } from './interest-topic.service';

describe('InterestTopicController', () => {
  let controller: InterestTopicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterestTopicController],
      providers: [InterestTopicService],
    }).compile();

    controller = module.get<InterestTopicController>(InterestTopicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
