import { PartialType } from '@nestjs/mapped-types';
import { CreatePopulationGroupDto } from './create-population-group.dto';

export class UpdatePopulationGroupDto extends PartialType(CreatePopulationGroupDto) {}
