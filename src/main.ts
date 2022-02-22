import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import { removeEmptyProperties } from './shared/middleware/middleware.camelcaseKeys';
import { test } from './shared/middleware/test';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './shared/error-response/http-exception.filter';
import { pagingMiddleware } from './shared/middleware/middleware.paging';
async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  if (process.env.APP_ENV == 'dev') {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('BOT COIN')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }
  app.enableCors();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.useGlobalPipes(new ValidationPipe());
  app.use(morgan('tiny'));
  app.use(removeEmptyProperties());
  app.use(pagingMiddleware());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(port, () => {
    console.log(`run port ${port}`);
    // test();
  });
}
bootstrap();
