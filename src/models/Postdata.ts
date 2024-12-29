import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Userdata } from './Userdata.js';

@Entity({ name: 'postdata' })
export class Postdata {
  @PrimaryColumn()
  ID!: number;

  @Column({ type: 'json', nullable: true })
  text_content?: any;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_creation!: Date;

  @ManyToOne(() => Userdata, (user) => user.ID, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'ID' }) // Añadir JoinColumn aquí
  user!: Userdata;
}
