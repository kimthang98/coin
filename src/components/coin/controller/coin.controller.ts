
import {  Controller } from '@nestjs/common';
import { ApiHeader ,ApiTags } from '@nestjs/swagger';
import { CoinService } from '../service/coin.service';
import { ApiResponseService } from '../../../shared/api-response/api-response.service';


@ApiTags('Coin')
@ApiHeader({
    name: 'Content-Type',
    description: 'application/json',
})
@Controller('/coin')
export class CoinController {
constructor(private response: ApiResponseService, private coinService: CoinService) {}
}
    