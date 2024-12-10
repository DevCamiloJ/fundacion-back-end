import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateGuardianDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
  
  @IsNumber()
  @Min(0)
  @Max(120)
  edad: number;
  
  @IsString()
  @IsNotEmpty()
  tipoDocumento: string;
  
  @IsString()
  @IsNotEmpty()
  numeroDocumento: string;
  
  @IsString()
  @IsNotEmpty()
  escolaridad: string;
  
  @IsBoolean()
  trabaja: boolean;
  
  @IsString()
  @IsOptional()
  lugarTrabajo?: string;
  
  @IsBoolean()
  emprendeOArte: boolean;
  
  @IsString()
  @IsOptional()
  cualArte?: string;
  
  @IsNumber()
  @Min(0)
  numeroHijos: number;
  
  @IsString()
  @IsNotEmpty()
  numeroCelular: string;
}
