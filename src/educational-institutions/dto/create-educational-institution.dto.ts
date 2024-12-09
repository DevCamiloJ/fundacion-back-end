import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEducationalInstitutionDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
