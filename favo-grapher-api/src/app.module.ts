import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './posts/posts.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'sasa1018',
      database: 'favographer',
      entities: [PostEntity],
      synchronize: true // 開発用。自動でテーブル作成
    })
    ,PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
