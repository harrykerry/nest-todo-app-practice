import {
  IsString,
  IsOptional,
  IsDateString,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'Task Description must be a valid string' })
  @IsNotEmpty({ message: 'Task Description cannot be empty' })
  @MinLength(3, { message: 'Description Too Short' })
  taskDescription: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
