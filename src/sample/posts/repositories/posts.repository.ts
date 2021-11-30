import { Repository } from '../../../decorators/repository.decorator';
import { PostEntity } from '../entities/post.entity';

@Repository(PostEntity)
export class PostsRepository {}
