import { IsArray,IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  nombres: string;

  @IsString()
  apellidos: string;

  @IsString()
  tipoDocumento: string;

  @IsString()
  numeroDocumento: string;

  @IsString()
  fechaNacimiento: string;

  @IsUUID()
  paisNacimiento: string;

  @IsUUID()
  departamentoNacimiento: string;

  @IsUUID()
  ciudadNacimiento: string;

  @IsString()
  peso: number;

  @IsString()
  talla: string;

  @IsOptional()
  @IsString()
  institucionEducativa: string;

  @IsOptional()
  @IsString()
  grado: string;

  @IsString()
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
  numeroCasoPsicologico: string;

  @IsArray()
  @IsUUID("4", { each: true })
  areasInteres: string[];

  @IsArray()
  @IsUUID("4", { each: true })
  discapacidades: string[];

  @IsOptional()
  @IsString()
  discapacidadMedica: string;

  @IsOptional()
  @IsString()
  imagenUrl: string;
}
