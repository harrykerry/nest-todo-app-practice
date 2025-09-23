import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  Length,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @Length(2, 30, { message: 'Name must be between 2 and 30 characters' })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  firstName: string;

  @IsString()
  @Length(2, 30, { message: 'Name must be between 2 and 30 characters' })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  lastName: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email address' })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.toLowerCase().trim() : value,
  )
  emailAddress?: string;

  @IsString()
  @Length(2, 50, { message: 'Username must be between 2 and 50 characters' })
  @Matches(/^[a-z]+$/, {
    message: 'Username must contain only letters',
  })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.toLowerCase().trim() : value,
  )
  username: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/(?=.*[a-z])/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number' })
  @Matches(/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/, {
    message: 'Password must contain at least one special character',
  })
  password: string;
}
