import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import * as nodeMailer from 'nodemailer';
import { sendMail } from './../../../shared/common/sendmail';
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

  async sendMail() {
    // const secure = process.env.MAIL_ENCRYPTION == 'false' ? false : true;
    const transporter = nodeMailer.createTransport({
      host: `smtp.gmail.com`,
      port: 587,
      secure: false,
      auth: {
        user: `zocodevelop01@gmail.com`,
        pass: 'zoco@123456',
      },
    });
    const options = {
      from: `zocodevelop01@gmail.com`, // địa chỉ admin email bạn dùng để gửi
      to: 'dokimthang98@gmail.com', // địa chỉ gửi đến
      subject: 'hello', // Tiêu đề của mail
      html: `<h1>xin chao</h1>`, // Phần nội dung mail mình sẽ dùng html thay vì thuần văn bản thông thường.
    };

    return transporter.sendMail(options);
  }
}
