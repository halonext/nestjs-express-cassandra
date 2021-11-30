import { Module } from '@nestjs/common';

import { ExpressCassandraModule } from '../express-cassandra.module';
import { ExpressCassandraOptions } from '../interfaces/express-cassandra.interface';
import { ExpressCassandraOptionsFactory } from '../interfaces/module-options.interface';
import { PostsModule } from './posts/posts.module';

class ConfigService implements ExpressCassandraOptionsFactory {
  createExpressCassandraOptions(): ExpressCassandraOptions {
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
    ExpressCassandraModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: ConfigService,
    }),
    PostsModule,
  ],
})
export class AsyncUseExistingModule {}
