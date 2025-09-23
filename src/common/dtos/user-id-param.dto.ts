import { IsUUID } from 'class-validator';

export class UserIdParamDto {
  @IsUUID('4', { message: 'Invalid request' })
  id: string;
}
