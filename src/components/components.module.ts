import { Module } from '@nestjs/common';
import { CoinModule } from './coin/coin.module';
import { HistoryModule } from './history/history.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [UserModule, HistoryModule, CoinModule, AuthModule],
})
export class ComponentsModule {}
