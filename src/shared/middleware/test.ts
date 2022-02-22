import * as moment from 'moment';
import * as ccxt from 'ccxt';
import { User } from 'src/components/user/entities/user.entity';
import { getRepository } from 'typeorm';
import { COIN_TYPE, IS_ACTIVE, STATUS_USRE, _ROLE } from '../common/constants';
import { Coin } from 'src/components/coin/entities/coin.entity';
import { log } from 'console';

// const binance = new ccxt.binance({
//   apiKey: 'xnpUj8F0vU8XEm6Md5rciLt1AlpU9yl4iPSNvehc4jD1jzVhd77KHKkUnmBbIBiF',
//   secret: 'kc4rcWGcLmuxZENtWPSPOGGXu6LmZMqLXMasgvaBtba5AmmVs1IupkgZ9GMAykjX',
// });

async function printBalance(apiKey?: string, secret?: string) {
  try {
    const binance = new ccxt.binance({
      apiKey: apiKey || 'xnpUj8F0vU8XEm6Md5rciLt1AlpU9yl4iPSNvehc4jD1jzVhd77KHKkUnmBbIBiF',
      secret: secret || 'kc4rcWGcLmuxZENtWPSPOGGXu6LmZMqLXMasgvaBtba5AmmVs1IupkgZ9GMAykjX',
    });

    binance.setSandboxMode(true);
    const balance = await binance.fetchBalance();
    return binance;

    await binance.createMarketOrder(`ETH/USDT`, 'sell', 4.70053);
    // await binance.createOrder()

    const x = await binance.fetchBalance();
    const total: any = x.total;
    console.log(total);

    console.log(total.USDT * 0.1);
    console.log((total.USDT / 100) * 10);

    // console.log(455555, balance.free);
  } catch (error) {
    console.log(error);
  }
}

export async function test() {
  try {
    const users = await getRepository(User).find({
      select: [
        'id',
        'role',
        'email',
        'phone',
        'url',
        'name',
        'activated',
        'apiKey',
        'secret',
        'status',
        'created_at',
      ],
      where: {
        is_active: IS_ACTIVE.ACTIVE,
        role: _ROLE.USER,
        status: STATUS_USRE.ACTIVE,
      },
    });

    // const coins = await Promise.all()
    users.forEach(async (element) => {
      const binance = new ccxt.binance();

      const coin = await getRepository(Coin).find({
        select: ['id', 'type', 'price_start', 'quantily_usdt', 'percent_sale', 'coin', 'time_day'],
        where: {
          is_active: IS_ACTIVE.ACTIVE,
          user_id: element.id,
          status: STATUS_USRE.ACTIVE,
        },
      });
      await Promise.all(
        coin.map(async (e, i) => {
          try {
            const binance = new ccxt.binance();
            const price = await binance.fetchOHLCV(e.coin, e.time_day, undefined, 2);
            const formmat = price.map((els, i) => ({
              coin: e.coin, // tên coin
              timestamp: moment(els[0]).format('YYYY-MM-DD HH:mm:ss'), // thơi gian
              open: els[1], // giá lúc mở
              high: els[2], // giá trần
              low: els[3], // giá sàn
              close: els[4], // giá đóng
              volume: els[5],
            }));
            // console.log(i, formmat);
            if (e.type == COIN_TYPE.BUY) {
              // mua
              const percent_buy = e.percent_sale / 100 + 1; // tính phần trăm mua
              const price_buy = e.price_start * percent_buy;
              const percent_sell = e.percent_sale / 100; // tính phần trăm bán
              const price_sell = e.price_start * (1 - percent_sell);
              const x = e.price_start / 100;
              const xx = x * 2;
              const current_price = formmat[formmat.length - 1].close; // giá hiên tại
              if (current_price > price_buy) {
                try {
                  console.log(i, e.coin, 'mua');
                  const price_coin = await printBalance();
                  const x = await price_coin.fetchBalance();
                  const total: any = x.total;

                  const ss = (total.USDT / 100) * e.quantily_usdt; // số tiền mua
                  const quantily_coin = ss / current_price; // số lương coin

                  await price_coin.createMarketOrder(e.coin, 'buy', quantily_coin);

                  // await manager.update(User, 1, { firstName: "Rizzrak" });
                  await getRepository(Coin).update(e.id, {
                    price_start: current_price,
                    type: COIN_TYPE.SELL,
                  });

                  console.log(i, ss / current_price);

                  console.log(total);

                  // console.log(total.USDT * 0.1);
                  // console.log((total.USDT / 100) * 10);

                  const coins = e.coin.split('/')[0];
                  // console.log(coins);

                  return true;
                } catch (er) {
                  console.log(i, e.coin);
                  return false;
                }
              } else {
                console.log('không mua');
                return false;
              }

              console.log('giá bắt đầu', e.price_start);
              console.log('phần trăm mua', percent_buy);
              console.log('phần trăm bán', percent_sell);
              console.log('giá mua', price_buy);
              console.log('giá bán', price_buy * (1 - percent_sell));
              console.log('giá bán mua lại ', price_sell * percent_buy);

              return COIN_TYPE.BUY; // mua
            } else {
              // bán

              const price_coin = await printBalance();

              const x = await price_coin.fetchBalance();
              const total: any = x.total;

              console.log(i, total);
              console.log(i, 'bán');

              return COIN_TYPE.SELL; // bán
            }
          } catch (err) {
            return false;
          }
        }),
      );
    });
    // binance.setSandboxMode(true);
    // const blance = await binance.fetchBalance();
    // console.log(blance);
    // console.log(1, blance);
    // const price = await binance.fetchOHLCV('BTC/USDT', '1d', undefined, 20);
    // const formmat = price.map((e) => ({
    //   timestamp: moment(e[0]).format('YYYY-MM-DD HH:mm:ss'),
    //   open: e[1],
    //   high: e[2],
    //   low: e[3],
    //   close: e[4],
    //   volume: e[5],
    // }));
    // console.log(formmat);
    // console.log(formmat.length);
  } catch (error) {
    console.log('lỗi');
    console.log(error);
  }
}
