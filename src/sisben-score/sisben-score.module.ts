import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SisbenScoreService } from './sisben-score.service';
import { SisbenScoreController } from './sisben-score.controller';
import { SisbenScore } from './entities/sisben-score.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SisbenScore])],
  controllers: [SisbenScoreController],
  providers: [SisbenScoreService],
  exports: [SisbenScoreService]
})
export class SisbenScoreModule {}
