import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User.js';

@Entity('post')
export class Post {
  @PrimaryColumn({ type: 'int', unsigned: true })
  ID!: number;

  @Column({ type: 'longtext', nullable: true })
  text_content!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_creation!: Date;

  @ManyToOne(() => User, (user) => user.ID, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'ID' })
  user!: User;
}
