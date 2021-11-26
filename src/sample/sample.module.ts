import { Module } from '@nestjs/common';

import { ExpressCassandraCoreModule } from '../express-cassandra-core.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [ExpressCassandraCoreModule.forRoot(), PostsModule],
})
export class SampleModule {}
