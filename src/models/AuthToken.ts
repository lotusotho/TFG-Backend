import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User.js';

@Entity('authToken')
export class AuthToken {
  @PrimaryColumn({ type: 'int', unsigned: true })
  ID!: number;

  @Column({ type: 'varchar', length: 500, default: '' })
  token!: string;

  @ManyToOne(() => User, (user) => user.ID, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'ID' })
  user!: User;
}
