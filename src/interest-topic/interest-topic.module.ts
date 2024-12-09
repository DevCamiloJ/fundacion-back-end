import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InterestTopicService } from './interest-topic.service';
import { InterestTopicController } from './interest-topic.controller';
import { InterestTopic } from './entities/interest-topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InterestTopic])],
  controllers: [InterestTopicController],
  providers: [InterestTopicService],
  exports: [InterestTopicService]
})
export class InterestTopicModule {}
