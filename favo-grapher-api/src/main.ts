import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  //const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // どこからでもアクセス可能（開発用）
  app.enableCors({
    origin: 'http://localhost:3000', // Next.js のフロントURL
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  });

  // uploads フォルダを /uploads で公開
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });

  await app.listen(5000);
}


bootstrap();
