import { Coin } from 'src/components/coin/entities/coin.entity';
import { History } from 'src/components/history/entities/history.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { IS_ACTIVE, STATUS_USRE, _ROLE } from '../../../shared/common/constants';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  uuid: string;

  @Column({
    nullable: true,
    default: _ROLE.USER,
  })
  role: number;

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
  url: string;

  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    nullable: true,
    default: IS_ACTIVE.INACTIVE,
  })
  activated: number;

  @Column({
    nullable: true,
  })
  key_password: string;

  // khóa bí mật
  @Column({
    nullable: true,
  })
  apiKey: string;

  // khóa bí mật
  @Column({
    nullable: true,
  })
  secret: string;

  @Column({
    nullable: true,
  })
  token: string;

  @Column({
    default: STATUS_USRE.ACTIVE,
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

  @OneToMany(() => History, (wallet_historys) => wallet_historys.user)
  wallet_historys: History[];

  @OneToMany(() => Coin, (coin) => coin.user)
  coins: Coin[];
}
