import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  secondName: string;

  @IsOptional()
  @IsEmail()
  emailAddress?: string;

  @IsString()
  @MinLength(6)
  password: string;
}
