import { IsString, MinLength, Length, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50, { message: 'Invalid Username' })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.toLowerCase().trim() : value,
  )
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Invalid Password' })
  password: string;
}
