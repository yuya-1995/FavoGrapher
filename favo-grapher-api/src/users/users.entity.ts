import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryColumn()
  id: string; // Google 固有ID

  @Column()
  user_id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  introduction: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ type: 'char', length: 1, default: '0' })
  delete_flg: string; // 論理削除フラグ（"0": 有効, "1": 削除）

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
