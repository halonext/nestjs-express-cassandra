import { Module } from '@nestjs/common';

import { ExpressCassandraModule } from '../express-cassandra.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ExpressCassandraModule.forRoot({
      clientOptions: {
        contactPoints: ['127.0.0.1'],
      },
    }),
    PostsModule,
  ],
})
export class SampleModule {}
