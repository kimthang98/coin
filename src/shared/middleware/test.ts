import * as moment from 'moment';
import * as ccxt from 'ccxt';

export async function test() {
  try {
    const binance = new ccxt.binance({
      apiKey: 'xnpUj8F0vU8XEm6Md5rciLt1AlpU9yl4iPSNvehc4jD1jzVhd77KHKkUnmBbIBiF',
      secret: 'kc4rcWGcLmuxZENtWPSPOGGXu6LmZMqLXMasgvaBtba5AmmVs1IupkgZ9GMAykjX',
    });
    binance.setSandboxMode(true);
    const blance = await binance.fetchBalance();

    console.log(blance);

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
