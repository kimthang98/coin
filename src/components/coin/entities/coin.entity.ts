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
import { IS_ACTIVE, COIN_TYPE } from '../../../shared/common/constants';
import { User } from './../../user/entities/user.entity';
@Entity({ name: 'coins' })
export class Coin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: COIN_TYPE.BUY,
    nullable: true,
  })
  type: number;
  @Column({
    nullable: true,
    type: 'float',
  })
  price: number;
  @Column({
    nullable: true,
  })
  coin: string;
  @Column({
    nullable: true,
    type: 'float',
  })
  price_start: number;
  @Column({
    nullable: true,
  })
  time_day: string;

  @Column({
    nullable: true,
    type: 'float',
  })
  quantily_usdt: number;
  // phần trăm bán
  @Column({
    nullable: true,
    type: 'float',
  })
  percent_sale: number;
  @Column({
    name: 'user_id',
    nullable: true,
  })
  user_id: number;
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

  @ManyToOne(() => User, (user) => user.coins)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;
}
