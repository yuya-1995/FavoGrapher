import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn('increment') // UUIDで自動生成
  id: string;

  @Column()
  user_id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  author: string;

  @Column({ type: 'char', length: 1, default: '0' })
  delete_flg: string; // 論理削除フラグ（"0": 有効, "1": 削除）

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
