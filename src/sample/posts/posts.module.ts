import { Module } from '@nestjs/common';

import { ExpressCassandraModule } from '../../express-cassandra.module';
import { PhotoEntity } from './entities/photo.entity';
import { PostEntity } from './entities/post.entity';
import { PostsController } from './posts.controller';
import { PhotosRepository } from './repositories/photos.repository';
import { PostsRepository } from './repositories/posts.repository';

@Module({
  imports: [
    ExpressCassandraModule.forFeature([
      PostEntity,
      PhotoEntity,
      PostsRepository,
      PhotosRepository,
    ]),
  ],
  controllers: [PostsController],
})
export class PostsModule {}
