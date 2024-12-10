import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFamilyCoreDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
