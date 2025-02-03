import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Userdata } from './Userdata';

@Entity({ name: 'usertype' })
export class Usertype {
  @PrimaryColumn()
  ID!: number;

  @Column({ type: 'varchar', length: 7 })
  name!: string;

  @JoinColumn({ name: 'ID' })
  users!: Userdata[];
}
