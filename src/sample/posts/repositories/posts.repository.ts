import { lastValueFrom } from 'rxjs';

import { BaseRepository } from '../../../base-repository';
import { Repository } from '../../../decorators/repository.decorator';
import { PostEntity } from '../entities/post.entity';

@Repository(PostEntity)
export class PostsRepository extends BaseRepository<PostEntity> {
  /**
   * Custom save function
   * @param title
   * @param content
   */
  async createPost(
    title: string,
    content: string,
  ): Promise<PostEntity | Error> {
    return lastValueFrom(
      this.save({
        postId: 1,
        title,
        content,
      }),
    );
  }
}
