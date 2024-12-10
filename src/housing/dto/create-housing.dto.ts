import { IsEnum, IsInt, IsString, Length, Min } from 'class-validator';
import { TipoVivienda } from '../enums/tipo-vivienda.enum';

export class CreateHousingDto {
  @IsEnum(TipoVivienda, { message: 'El tipo de vivienda no es válido' })
  vivienda: TipoVivienda;
  
  @IsString()
  @Length(1, 200)
  direccionVivienda: string;
  
  @IsInt()
  @Min(1)
  numeroHabitaciones: number;
  
  @IsString()
  @Length(1, 50)
  tipoVivienda: string;
  
  @IsString()
  @Length(1, 100)
  barrio: string;
  
  @IsInt()
  @Min(1)
  numeroPersonasConviven: number;
}
