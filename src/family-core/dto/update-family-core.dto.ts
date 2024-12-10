import { PartialType } from '@nestjs/mapped-types';
import { CreateFamilyCoreDto } from './create-family-core.dto';

export class UpdateFamilyCoreDto extends PartialType(CreateFamilyCoreDto) {}
