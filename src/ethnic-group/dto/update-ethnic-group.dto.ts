import { PartialType } from '@nestjs/mapped-types';
import { CreateEthnicGroupDto } from './create-ethnic-group.dto';

export class UpdateEthnicGroupDto extends PartialType(CreateEthnicGroupDto) {}
