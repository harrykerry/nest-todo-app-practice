import { BaseEntity } from './base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  emailAddress: string;

  @Column({ select: false })
  password: string;

  @Column({ default: true })
  isActive: boolean;
}
