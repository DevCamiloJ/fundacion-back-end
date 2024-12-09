import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEpsDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
