import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  firstName: string;

  @Expose()
  secondName: string;

  @Expose()
  emailAddress: string;

  @Exclude()
  password: string;
}
