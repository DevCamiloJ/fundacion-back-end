import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FamilyCoreService } from './family-core.service';
import { FamilyCoreController } from './family-core.controller';
import { FamilyCore } from './entities/family-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FamilyCore])],
  controllers: [FamilyCoreController],
  providers: [FamilyCoreService],
  exports: [FamilyCoreService]
})
export class FamilyCoreModule {}
