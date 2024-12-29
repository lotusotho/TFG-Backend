import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Userdata } from './Userdata.js';

@Entity({ name: 'usertype' })
export class Usertype {
  @PrimaryColumn()
  ID!: number;

  @Column({ type: 'varchar', length: 7 })
  name!: string;

  @ManyToOne(() => Userdata, (user) => user.type)
  @JoinColumn({ name: 'ID' }) // Specify the foreign key column
  users!: Userdata[];
}
