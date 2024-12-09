import { Test, TestingModule } from '@nestjs/testing';
import { InterestTopicService } from './interest-topic.service';

describe('InterestTopicService', () => {
  let service: InterestTopicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterestTopicService],
    }).compile();

    service = module.get<InterestTopicService>(InterestTopicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
