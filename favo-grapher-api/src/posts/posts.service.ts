import { Injectable } from '@nestjs/common';
import { PostType } from './posts.interface';
import { PostEntity } from './posts.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {
    private readonly posts: PostType[] = [];

    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>,
    ) {}

    async findAll(): Promise<PostType[]> {
        const posts = await this.postRepository.find({
        order: { createdAt: 'DESC' }, // 新しい順に
        });
        return posts.map((post) => ({
            id: post.id,
            title: post.title,
            content: post.content,
            author: post.author,
            createdAt: post.createdAt.toISOString(),
        }));
    }

    async findById(id: string): Promise<PostType | undefined> {
        const post = await this.postRepository.findOneBy({ id });
        if (!post) return undefined;
        return {
            id: post.id,
            title: post.title,
            content: post.content,
            author: post.author,
            createdAt: post.createdAt.toISOString(),
        };
    }

    async create(post: PostType): Promise<PostEntity> {
        try {
            const newPost = this.postRepository.create({
            title: post.title,
            content: post.content,
            author: post.author,
            });
            return await this.postRepository.save(newPost);
        } catch (error) {
            console.error("投稿作成エラー:", error);
            throw error; // NestJS が 500 を返す
        }
    }

}
