import { Module } from '@nestjs/common';

import { ExpressCassandraModule } from '../../express-cassandra.module';
import { PhotoEntity } from './entities/photo.entity';
import { PostEntity } from './entities/post.entity';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
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
  providers: [PostsService, PhotosService],
  controllers: [PostsController, PhotosController],
})
export class PostsModule {}
