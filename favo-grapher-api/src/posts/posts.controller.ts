import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import type { PostType } from './posts.interface';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get()
    findAll(){
        return this.postsService.findAll();
    }

    @Post()
    async create(@Body() post: Partial<PostType>): Promise<PostType> {
    const created = await this.postsService.create(post as PostType);
    return {
        id: created.id,
        title: created.title,
        content: created.content,
        author: created.author,
        user_id: created.user_id,
        createdAt: created.createdAt.toISOString(),
    };
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<PostType | undefined> {
        return await this.postsService.findById(id);
    }

}
