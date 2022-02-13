import { User } from 'src/components/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IS_ACTIVE } from '../../../shared/common/constants';
@Entity({ name: 'wallet_historys' })
export class History {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    default: IS_ACTIVE.ACTIVE,
  })
  is_active: number;
  @Column({
    nullable: true,
    type: 'bigint',
  })
  money_start: number;
  @Column({
    nullable: true,
    type: 'bigint',
  })
  money_end: number;
  @Column({
    name: 'user_id',
    nullable: true,
  })
  user_id: number;
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

  @ManyToOne(() => User, (user) => user.wallet_historys)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;
}
