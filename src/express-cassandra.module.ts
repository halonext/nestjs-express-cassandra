import { DynamicModule, Module, Type } from '@nestjs/common';

import { DEFAULT_CONNECTION_NAME } from './constants';
import { ExpressCassandraCoreModule } from './express-cassandra-core.module';
import {
  ExpressCassandraModuleAsyncOptions,
  ExpressCassandraModuleOptions,
} from './interfaces/module-options.interface';
import createFeatureProviders from './utils/providers';

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

  static forFeature(
    entities: Type[] = [],
    connection = DEFAULT_CONNECTION_NAME,
  ): DynamicModule {
    const providers = createFeatureProviders(entities, connection);
    return {
      module: ExpressCassandraModule,
      providers: providers,
      exports: providers,
    };
  }
}
