import { Injectable } from '@nestjs/common';
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
}
