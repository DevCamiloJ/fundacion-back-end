import { PartialType } from '@nestjs/mapped-types';
import { CreateEducationalInstitutionDto } from './create-educational-institution.dto';

export class UpdateEducationalInstitutionDto extends PartialType(CreateEducationalInstitutionDto) {}
