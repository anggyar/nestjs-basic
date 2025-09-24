import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import mustache from 'mustache-express';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser('Rahasia'));
  await app.listen(process.env.PORT ?? 3000);

  app.set('views', __dirname + '/../views');

  app.set('view engine', 'html');

  app.engine('html', mustache());
}
bootstrap();
