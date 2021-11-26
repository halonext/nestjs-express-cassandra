import { DynamicModule, Module } from '@nestjs/common';

import { ExpressCassandraCoreModule } from './express-cassandra-core.module';
import {
  ExpressCassandraModuleAsyncOptions,
  ExpressCassandraModuleOptions,
} from './interfaces/module-options.interface';

@Module({})
export class ExpressCassandraModule {
  static forRoot(options: ExpressCassandraModuleOptions): DynamicModule {
    return {
      module: ExpressCassandraModule,
      imports: [ExpressCassandraCoreModule.forRoot(options)],
    };
  }

  static forRootAsync(
    options: ExpressCassandraModuleAsyncOptions,
  ): DynamicModule {
    return {
      module: ExpressCassandraModule,
      imports: [ExpressCassandraCoreModule.forRootAsync(options)],
    };
  }
}
