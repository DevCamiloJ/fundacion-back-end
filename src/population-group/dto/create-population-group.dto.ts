import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePopulationGroupDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
