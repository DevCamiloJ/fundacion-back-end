import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInterestTopicDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
