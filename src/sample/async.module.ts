import { Module } from '@nestjs/common';

import { ExpressCassandraModule } from '../express-cassandra.module';
import { ExpressCassandraOptions } from '../interfaces/express-cassandra.interface';
import { PostsModule } from './posts/posts.module';

class ConfigService {
  getOptions(): ExpressCassandraOptions {
    return {
      clientOptions: {
        contactPoints: ['127.0.0.1'],
        localDataCenter: 'datacenter1',
        keyspace: 'sample_app',
      },
      ormOptions: {
        migration: 'drop',
        disableTTYConfirmation: true,
      },
    };
  }
}

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
class ConfigModule {}

@Module({
  imports: [
    ConfigModule,
    ExpressCassandraModule.forRootAsync({
      useFactory: (config: ConfigService) => config.getOptions(),
      inject: [ConfigService],
    }),
    PostsModule,
  ],
})
export class AsyncModule {}
