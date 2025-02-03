import { Entity, Column, JoinColumn, PrimaryColumn, OneToMany } from 'typeorm';

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

  @OneToMany(() => Userdata, (userdata) => userdata.userType)
  users!: Userdata[];

  @JoinColumn({ name: 'type' })
  userType!: number;
}
