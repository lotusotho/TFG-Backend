import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserType } from './Usertype.js';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  ID!: number;

  @Column({ type: 'varchar', length: 15 })
  username!: string;

  @Column({ type: 'varchar', length: 50 })
  email!: string;

  @Column({ type: 'varchar', length: 72 })
  password!: string;

  @Column({ type: 'tinyint', unsigned: true, default: 0 })
  type!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_creation!: Date;

  @ManyToOne(() => UserType, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'type' })
  userType!: UserType;
}
