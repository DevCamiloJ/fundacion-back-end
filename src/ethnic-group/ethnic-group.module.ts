import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EthnicGroupService } from './ethnic-group.service';
import { EthnicGroupController } from './ethnic-group.controller';
import { EthnicGroup } from './entities/ethnic-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EthnicGroup])],
  controllers: [EthnicGroupController],
  providers: [EthnicGroupService],
  exports: [EthnicGroupService]
})
export class EthnicGroupModule {}
