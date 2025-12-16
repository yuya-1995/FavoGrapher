import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import type { UserType } from './users.interface';
import type { UserEntity } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  // GET /users/:id でユーザー存在確認
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Post()
  async create(@Body() user: Partial<UserEntity>): Promise<UserType> {
    const created = await this.usersService.create(user);

    return {
      id: created.id,
      user_id: created.user_id,
      name: created.name,
      introduction: created.introduction,
      email: created.email,
      image: created.image,
      delete_flg: created.delete_flg,
      created_at: created.created_at.toISOString(),
    };
  }


}
