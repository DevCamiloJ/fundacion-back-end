import { PartialType } from '@nestjs/mapped-types';
import { CreateDisabilityDto } from './create-disability.dto';

export class UpdateDisabilityDto extends PartialType(CreateDisabilityDto) {}
