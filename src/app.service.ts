import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  getHello(): string {
    return 'Hello World!';
  }

  // chạy tiến trình
  // @Cron(CronExpression.EVERY_SECOND)
  // handleCron() {
  //   console.log(11111);

  //   this.logger.debug('Called every 30 seconds');
  //   console.log(55555);
  // }
}
