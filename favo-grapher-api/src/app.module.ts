import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './posts/posts.entity';
import { UserEntity } from './users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'sasa1018',
      database: 'favographer',
      entities: [PostEntity, UserEntity],
      synchronize: true // 開発用。自動でテーブル作成
    })
    ,PostsModule
    ,UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
