import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  
  @IsEmail()
  @IsNotEmpty()
  @MinLength(6)
  email: string;
  
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
