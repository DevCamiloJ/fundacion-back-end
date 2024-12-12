import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterestTopicModule } from 'src/interest-topic/interest-topic.module';
import { DisabilityModule } from 'src/disability/disability.module';

import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { Member } from './entities/member.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member]),
    InterestTopicModule,
    DisabilityModule
  ],
  controllers: [MembersController],
  providers: [MembersService],
})
export class MembersModule {}
