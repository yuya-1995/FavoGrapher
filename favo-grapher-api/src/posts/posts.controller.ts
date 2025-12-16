import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import type { PostType } from './posts.interface';
import type { PostDto } from './posts.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer";
import { extname } from "path";
import { rename } from "fs/promises";
import { join } from "path";

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    @UseInterceptors(
        FileInterceptor("image", {
            storage: diskStorage({
            destination: "./uploads",
            filename: (req, file, cb) => {
                const { user_id } = req.body;
                const createdAt = new Date()
                    .toISOString()
                    .replace(/[-:.TZ]/g, "")
                    .slice(0, 14);
                const ext = extname(file.originalname);
                // ファイル名（仮）
                const filename = `tmp-${user_id}-${createdAt}${ext}`;
                cb(null, filename);
                },
            }),
        }),
    )
    async create(
        @UploadedFile() file: any,
        @Body() body: PostDto,
    ) {
        
        // ① DB保存（ここで id が確定）
        const created = await this.postsService.create({
            ...body,
            image: "",
        });

        // ② ファイル名を作り直す
        const ext = extname(file.originalname);
        const newFilename = `${created.id}-${created.user_id}-${created.created_at
            .toISOString()
            .replace(/[-:.TZ]/g, "")
            .slice(0, 14)}${ext}`;

        const oldPath = join("uploads", file.filename);
        const newPath = join("uploads", newFilename);

        await rename(oldPath, newPath);

        // ③ image URL を更新
        const imageUrl = `/uploads/${newFilename}`;
        await this.postsService.updateImage(created.id, imageUrl);

        return {
            id: created.id,
            image: created.image,
            title: created.title,
            content: created.content,
            author: created.author,
            user_id: created.user_id,
            delete_flg: created.delete_flg,
            created_at: created.created_at.toISOString(),
        };
    }

    @Get()
    findAll(){
        return this.postsService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<PostType | undefined> {
        return await this.postsService.findById(id);
    }

}
