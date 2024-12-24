import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('user_type')
export class UserType {
  @PrimaryColumn({ type: 'tinyint', unsigned: true })
  id!: number;

  @Column({ type: 'varchar', length: 7, default: '' })
  name!: string;
}
