import { Controller, Get } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { MailService } from '../service/mail.service';
import { ApiResponseService } from '../../../shared/api-response/api-response.service';

@ApiTags('Mail')
@ApiHeader({
  name: 'Content-Type',
  description: 'application/json',
})
@Controller('/mail')
export class MailController {
  constructor(private response: ApiResponseService, private mailService: MailService) {}

  @Get()
  async sendMails() {
    return await this.mailService.sendUserConfirmation();
  }
}
