import { IsEmpty, IsString } from 'class-validator';

export class CreateDisabilityDto {
  @IsString()
  @IsEmpty()
  nombre: string;
}
