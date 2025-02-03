import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  OneToOne,
} from 'typeorm';
import { Userdata } from './Userdata';

@Entity({ name: 'authtoken' })
export class Authtoken {
  @PrimaryColumn()
  ID!: number;

  @Column({ type: 'varchar', length: 500 })
  token!: string;

  @OneToOne(() => Userdata, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'ID' })
  user!: Userdata;
}
