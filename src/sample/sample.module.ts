import { Module } from '@nestjs/common';

import { ExpressCassandraModule } from '../express-cassandra.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ExpressCassandraModule.forRoot({
      clientOptions: {
        contactPoints: ['127.0.0.1'],
        localDataCenter: 'datacenter1',
        keyspace: 'sample_app',
      },
      ormOptions: {
        migration: 'alter',
        disableTTYConfirmation: true,
      },
    }),
    PostsModule,
  ],
})
export class SampleModule {}
