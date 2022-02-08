import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { IS_ACTIVE } from './../../../shared/constants/connstants';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  phone: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: true,
  })
  uuid: string;

  @Column({
    nullable: true,
  })
  url: string;

  @Column({
    nullable: true,
  })
  token: string;

  @Column({
    default: IS_ACTIVE.ACTIVE,
    nullable: true,
  })
  status: number;
  @Column({
    default: IS_ACTIVE.ACTIVE,
    nullable: true,
  })
  is_active: number;
  @Column({
    nullable: true,
  })
  create_by: number;
  @Column({
    nullable: true,
  })
  update_by: number;
  @Column({
    nullable: true,
  })
  delete_by: number;
  @CreateDateColumn()
  public created_at: Date;
  @UpdateDateColumn()
  public updated_at: Date;
  @DeleteDateColumn()
  public deleted_at: Date;
}
