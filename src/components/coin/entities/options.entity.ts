import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { IS_ACTIVE, COIN_TYPE } from '../../../shared/common/constants';
@Entity({ name: 'options' })
export class Options {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: COIN_TYPE.BUY,
    nullable: true,
  })
  key: string;
  @Column({
    nullable: true,
  })
  value: string;
  @Column({
    nullable: true,
  })
  type: number;
  @Column({
    default: IS_ACTIVE.ACTIVE,
  })
  is_active: number;
  @Column({
    default: IS_ACTIVE.ACTIVE,
  })
  status: number;
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
  @DeleteDateColumn({
    nullable: true,
  })
  public deleted_at: Date;
}
