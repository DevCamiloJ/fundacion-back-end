import { PartialType } from '@nestjs/mapped-types';
import { CreateInterestTopicDto } from './create-interest-topic.dto';

export class UpdateInterestTopicDto extends PartialType(CreateInterestTopicDto) {}
