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
import { User } from './../../user/entities/user.entity';
@Entity({ name: 'coins' })
export class Coin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  type: number;
  @Column({
    nullable: true,
    type: 'bigint',
  })
  price: number;
  @Column({
    nullable: true,
  })
  coin_buy: string;
  @Column({
    nullable: true,
  })
  coin_sell: string;

  @Column({
    nullable: true,
    type: 'bigint',
  })
  price_start: number;

  @Column({
    nullable: true,
    type: 'bigint',
  })
  quantily_usdt: number;
  // phần trăm bán
  @Column({
    nullable: true,
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
