import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PopulationTypeService } from './population-type.service';
import { PopulationTypeController } from './population-type.controller';
import { PopulationType } from './entities/population-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PopulationType])],
  controllers: [PopulationTypeController],
  providers: [PopulationTypeService],
  exports: [PopulationTypeService]
})
export class PopulationTypeModule {}
