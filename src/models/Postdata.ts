import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Userdata } from './Userdata';

@Entity({ name: 'postdata' })
export class Postdata {
  @PrimaryColumn()
  ID!: number;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'text' })
  emoji!: string;

  @Column({ type: 'json', nullable: true })
  text_content?: any;

  @Column({ type: 'json', nullable: true })
  md_content?: any;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_creation!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_updated!: Date;

  @ManyToOne(() => Userdata, (user) => user.ID, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'ID' })
  user!: Userdata;
}
