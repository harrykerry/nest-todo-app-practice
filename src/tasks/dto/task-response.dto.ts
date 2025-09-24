import { Exclude, Expose } from 'class-transformer';

export class TaskResponseDto {
  @Expose()
  id: string;

  @Expose()
  taskDescription: string;

  @Expose()
  dueDate: Date;
}
