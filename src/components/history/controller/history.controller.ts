
import {  Controller } from '@nestjs/common';
import { ApiHeader ,ApiTags } from '@nestjs/swagger';
import { HistoryService } from '../service/history.service';
import { ApiResponseService } from '../../../shared/api-response/api-response.service';


@ApiTags('History')
@ApiHeader({
    name: 'Content-Type',
    description: 'application/json',
})
@Controller('/history')
export class HistoryController {
constructor(private response: ApiResponseService, private historyService: HistoryService) {}
}
    