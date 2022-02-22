import { Global, Module } from '@nestjs/common';
import { MailController } from './controller/mail.controller';
import { MailService } from './service/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => {
        const secure = process.env.MAIL_ENCRYPTION == 'false' ? false : true;
        
        return {
          // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
          // or

          transport: {
            host: process.env.MAIL_HOST || 'smtp.gmail.com',
            secure: secure,
            auth: {
              user: process.env.MAIL_USERNAME || 'zocodevelop01@gmail.com',
              pass: process.env.MAIL_PASSWORD || 'zoco@123456',
            },
          },
          defaults: {
            from: `${process.env.APP_NAME} ${process.env.MAIL_USERNAME}`,
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
            options: {
              strict: true,
            },
          },
        };
      },
    }),
  ],
  providers: [MailService],
  controllers: [MailController],
})
export class MailModule {}
