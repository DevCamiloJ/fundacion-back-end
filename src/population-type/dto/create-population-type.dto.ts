import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePopulationTypeDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
