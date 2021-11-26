import { Controller, Post } from '@nestjs/common';

interface CreatePostResponse {
  title: string;
  body: string;
}

@Controller()
export class PostsController {
  @Post('/posts')
  create(): CreatePostResponse {
    return { title: 'Express Cassandra', body: 'A NestJS module' };
  }
}
