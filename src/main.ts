import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { removeEmptyProperties } from './shared/middleware/middleware.camelcaseKeys';
async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.use(morgan('tiny'));
  if (process.env.APP_ENV == 'dev') {
    const config = new DocumentBuilder().setTitle('BOT COIN').setVersion('1.0').build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }
  app.use(removeEmptyProperties());
  await app.listen(port, () => {
    console.log(`run port ${port}`);
  });
}
bootstrap();
