import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ResetPasswordType } from 'src/shared/type/index.type';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async userresetPassword(user: ResetPasswordType) {
    return await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Reset password',
      template: 'resetPassword', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user.name,
        url: user.url,
        account: user.account,
      },
    });
  }
}
