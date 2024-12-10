import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEthnicGroupDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
