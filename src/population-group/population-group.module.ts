import { Module } from '@nestjs/common';
import { PopulationGroupService } from './population-group.service';
import { PopulationGroupController } from './population-group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PopulationGroup } from './entities/population-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PopulationGroup])],
  controllers: [PopulationGroupController],
  providers: [PopulationGroupService],
  exports: [PopulationGroupService]
})
export class PopulationGroupModule {}
