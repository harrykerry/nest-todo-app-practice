import {
  IsString,
  IsOptional,
  IsDateString,
  IsUUID,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Description Too Short' })
  taskDescription: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsUUID()
  userId: string;
}
