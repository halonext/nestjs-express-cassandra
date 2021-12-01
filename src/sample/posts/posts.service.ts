import { Injectable } from '@nestjs/common';
import { types } from 'cassandra-driver';
import { lastValueFrom } from 'rxjs';

import { InjectRepository } from '../../decorators/inject-repository.decorator';
import { PostEntity } from './entities/post.entity';
import { PostsRepository } from './repositories/posts.repository';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsRepository)
    private readonly posts: PostsRepository,
  ) {}

  async find(
    query: Record<string, string> = {},
  ): Promise<PostEntity[] | Error> {
    return await lastValueFrom(this.posts.find(query));
  }

  async findOne(postId: string): Promise<PostEntity | Error> {
    return await lastValueFrom(
      this.posts.findOne({ postId: parseInt(postId) }),
    );
  }

  async create(title: string, content: string): Promise<PostEntity | Error> {
    return await this.posts.createPost(title, content);
  }

  async update(
    postId: string,
    title: string,
    content: string,
  ): Promise<types.ResultSet | Error> {
    return await lastValueFrom(
      this.posts.update(
        {
          postId: parseInt(postId),
        },
        { content },
      ),
    );
  }

  async delete(postId: string): Promise<types.ResultSet | Error> {
    return await lastValueFrom(
      this.posts.delete({
        postId: parseInt(postId),
      }),
    );
  }
}
