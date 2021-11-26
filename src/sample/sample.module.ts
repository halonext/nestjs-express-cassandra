import { Module } from '@nestjs/common';

import { ExpressCassandraCoreModule } from '../express-cassandra-core.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ExpressCassandraCoreModule.forRoot({
      clientOptions: {
        contactPoints: ['127.0.0.1'],
      },
    }),
    PostsModule,
  ],
})
export class SampleModule {}
