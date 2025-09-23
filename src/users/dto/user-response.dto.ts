import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  emailAddress: string;

  @Expose()
  username: string;

  @Expose()
  isActive: string;

  @Expose()
  createdAt: string;

  @Exclude()
  password: string;
}
