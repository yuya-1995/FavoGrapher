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
    create(@Body() post: PostType): void{
        this.postsService.create(post);
    }

    @Get(":id")
    findById(@Param("id") id: string): PostType | undefined {
        const post = this.postsService.findById(id);
        return post;
    }
}
