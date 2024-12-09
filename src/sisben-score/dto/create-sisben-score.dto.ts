import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSisbenScoreDto {
  @IsString()
  @IsNotEmpty()
  puntaje: string;
}
