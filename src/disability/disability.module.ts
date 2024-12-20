import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DisabilityService } from './disability.service';
import { DisabilityController } from './disability.controller';
import { Disability } from './entities/disability.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Disability])],
  controllers: [DisabilityController],
  providers: [DisabilityService],
  exports: [DisabilityService]
})
export class DisabilityModule {}
