import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HousingService } from './housing.service';
import { HousingController } from './housing.controller';
import { Housing } from './entities/housing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Housing])],
  controllers: [HousingController],
  providers: [HousingService],
  exports: [HousingService]
})
export class HousingModule {}
