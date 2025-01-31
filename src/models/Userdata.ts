import { Entity, Column, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Usertype } from './Usertype';

@Entity({ name: 'userdata' })
export class Userdata {
  @PrimaryColumn()
  ID!: number;

  @Column({ type: 'varchar', length: 15 })
  username!: string;

  @Column({ type: 'varchar', length: 50 })
  email!: string;

  @Column({ type: 'varchar', length: 72 })
  password!: string;

  @Column({ type: 'smallint' })
  type!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_creation!: Date;

  @OneToOne(() => Usertype, (userType) => userType.ID, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'type' })
  userType!: number;
}
