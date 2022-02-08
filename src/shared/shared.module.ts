/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Module, Global } from '@nestjs/common';
import { HashService } from './services/hash/hash.service';
import { ApiResponseService } from './api-response/api-response.service';

@Global()
@Module({
  imports: [],
  providers: [ApiResponseService, HashService],
  exports: [ApiResponseService, HashService],
})
export class SharedModule {}
