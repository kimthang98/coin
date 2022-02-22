import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, Min } from 'class-validator';
import { STATUS_COIN, validator_message } from 'src/shared/common/constants';
function values() {
  const arrNumber = [undefined];
  for (let index = 1; index < 101; index++) {
    arrNumber.push(index);
  }
  return arrNumber;
}
export class CoinCreateParams {
  @ApiProperty({
    default: '1d',
  })
  @IsNotEmpty()
  time_day: string;

  @ApiProperty({
    default: 'BTC/USDT',
  })
  @IsNotEmpty()
  coin: string;

  @ApiProperty({
    default: 10,
  })
  @IsNotEmpty()
  quantily_usdt: number;

  @ApiProperty({
    default: 2,
  })
  @IsNotEmpty()
  percent_sale: number;
}

export class CoinUpdateParams {
  @ApiProperty({
    default: '1d',
  })
  time_day: string;

  @ApiProperty({
    default: 'BTC/USDT',
  })
  coin: string;

  @ApiProperty({
    default: 10,
  })
  quantily_usdt: number;

  @ApiProperty({
    default: 2,
  })
  @IsIn([undefined, ...values()], { message: validator_message.coin_percent_sale })
  percent_sale: number;

  @ApiProperty({
    default: 10,
  })
  @IsIn([undefined, ...Object.values(STATUS_COIN)], { message: validator_message.coin_status })
  status: number;
}
