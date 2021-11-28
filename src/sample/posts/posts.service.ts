import { Injectable } from '@nestjs/common';
import { types } from 'cassandra-driver';
import { lastValueFrom } from 'rxjs';

import { InjectRepository } from '../../decorators/inject-repository.decorator';
import { Repository } from '../../repository';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly posts: Repository<PostEntity>,
  ) {}

  async find(
    query: Record<string, string> = {},
  ): Promise<PostEntity[] | Error> {
    return await lastValueFrom(this.posts.find(query));
  }

  async create(title: string, content: string): Promise<PostEntity | Error> {
    return await lastValueFrom(
      this.posts.save({
        title,
        content,
      }),
    );
  }

  async update(
    title: string,
    content: string,
  ): Promise<types.ResultSet | Error> {
    return await lastValueFrom(
      this.posts.update(
        {
          title,
        },
        { content },
      ),
    );
  }
}
