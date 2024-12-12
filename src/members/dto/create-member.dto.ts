import { IsArray, IsDateString, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  nombres: string;

  @IsString()
  apellidos: string;

  @IsString()
  tipoDocumento: string;

  @IsString()
  numeroDocumento: string;

  @IsDateString()
  fechaNacimiento: string;

  @IsUUID()
  paisNacimiento: string;

  @IsUUID()
  departamentoNacimiento: string;

  @IsUUID()
  ciudadNacimiento: string;

  @IsNumber()
  peso: number;

  @IsString()
  talla: string;

  @IsOptional()
  @IsString()
  institucionEducativa: string;

  @IsOptional()
  @IsString()
  grado: string;

  @IsDateString()
  fechaIngresoFundacion: string;

  @IsUUID()
  eps: string;

  @IsUUID()
  puntajeSisben: string;

  @IsOptional()
  @IsString()
  grupoPoblacional: string;

  @IsOptional()
  @IsString()
  grupoEtnico: string;

  @IsOptional()
  @IsString()
  numeroCasoVGB: string;

  @IsOptional()
  @IsString()
  numeroCasoViolenciaFamiliar: string;

  @IsOptional()
  @IsString()
  numeroCasoAcompañamientoPsicologico: string;

  @IsArray()
  @IsUUID("4", { each: true })
  areasInteres: string[];

  @IsArray()
  @IsUUID("4", { each: true })
  discapacidades: string[];

  @IsOptional()
  @IsString()
  discapacidadMedica: string;
}
