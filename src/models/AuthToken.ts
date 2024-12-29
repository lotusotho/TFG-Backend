import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Userdata } from './Userdata.js';

@Entity({ name: 'authtoken' })
export class AuthToken {
  @PrimaryColumn()
  ID!: number;

  @Column({ type: 'varchar', length: 500 })
  token!: string;

  @ManyToOne(() => Userdata, (user) => user.ID, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'ID' }) // Añadir JoinColumn aquí
  user!: Userdata;
}
