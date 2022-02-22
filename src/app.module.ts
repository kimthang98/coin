import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './../ormconfig';
import { ComponentsModule } from './components/components.module';
import { ApiResponseService } from './shared/api-response/api-response.service';
import { SharedModule } from './shared/shared.module';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
// import { MailerModule } from '@nestjs-modules/mailer';
// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
// import { join } from 'path';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(config),
    ScheduleModule.forRoot(),
    ComponentsModule,
    SharedModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: process.env.APP_KEY || '@ABC123',
        signOptions: {
          expiresIn: Number(process.env.JWT_TTL) || 999999999,
        },
      }),

      inject: [ConfigService],
    }),
    // MailerModule.forRootAsync({
    //   useFactory: () => ({
    //     transport: {
    //       host: 'mail.smtp.com',
    //       secure: false,
    //       auth: {
    //         user: 'zocodevelop01@gmail.com',
    //         pass: 'zoco@123456',
    //       },
    //     },
    //     defaults: {
    //       from: `zocodevelop01@gmail.com`,
    //     },
    //     template: {
    //       dir: join(__dirname, 'templates'),
    //       adapter: new HandlebarsAdapter(),
    //       options: {
    //         strict: true,
    //       },
    //     },
    //   }),
    // }),
  ],

  exports: [JwtModule],
  controllers: [AppController],
  providers: [AppService, ApiResponseService],
})
export class AppModule {}
