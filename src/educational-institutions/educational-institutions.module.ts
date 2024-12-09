import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EducationalInstitutionsService } from './educational-institutions.service';
import { EducationalInstitutionsController } from './educational-institutions.controller';
import { EducationalInstitution } from './entities/educational-institution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EducationalInstitution])],
  controllers: [EducationalInstitutionsController],
  providers: [EducationalInstitutionsService],
  exports: [EducationalInstitutionsService]
})
export class EducationalInstitutionsModule {}
