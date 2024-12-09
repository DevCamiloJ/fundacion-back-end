import { PartialType } from '@nestjs/mapped-types';
import { CreatePopulationTypeDto } from './create-population-type.dto';

export class UpdatePopulationTypeDto extends PartialType(CreatePopulationTypeDto) {}
