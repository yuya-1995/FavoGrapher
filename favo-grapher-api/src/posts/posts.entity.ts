import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn('increment') // UUIDで自動生成
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  author: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
