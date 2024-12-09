import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCityDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
  
  @IsNotEmpty()
  @IsUUID()
  departamentoId: string;
}
