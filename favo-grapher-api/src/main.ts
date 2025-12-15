import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // どこからでもアクセス可能（開発用）
  app.enableCors({
    origin: 'http://localhost:3000', // Next.js のフロントURL
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  });

  await app.listen(5000);
}


bootstrap();
