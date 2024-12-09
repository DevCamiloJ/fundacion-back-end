import { PartialType } from '@nestjs/mapped-types';
import { CreateSisbenScoreDto } from './create-sisben-score.dto';

export class UpdateSisbenScoreDto extends PartialType(CreateSisbenScoreDto) {}
