import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';

import { PostEntity } from './entities/post.entity';
import { PostsService } from './posts.service';

export interface CreatePostDTO {
  title: string;
  content: string;
}

@Controller()
export class PostsController {
  constructor(private readonly posts: PostsService) {}

  @Post('/posts')
  async create(@Body() { title, content }: CreatePostDTO): Promise<PostEntity> {
    const result = await this.posts.create(title, content);

    if (result instanceof Error) {
      throw new BadRequestException('Could not save post', result.message);
    }

    return result;
  }

  @Get('/posts')
  async list(@Query() query: Record<string, string>): Promise<PostEntity[]> {
    const result = await this.posts.find(query);

    if (result instanceof Error) {
      throw new BadRequestException('Could not get posts', result.message);
    }

    return result;
  }
}
