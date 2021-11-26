import {
  DynamicModule,
  Inject,
  Logger,
  Module,
  Provider,
} from '@nestjs/common';
import { nanoid } from 'nanoid';
import { defer, lastValueFrom, map } from 'rxjs';

import {
  EXPRESS_CASSANDRA_MODULE_ID,
  EXPRESS_CASSANDRA_MODULE_OPTIONS,
} from './constants';
import { ExpressCassandraModule } from './express-cassandra.module';
import ExpressCassandraClient from './express-cassandra-client';
import { Connection } from './interfaces/connection.interface';
import {
  ExpressCassandraModuleAsyncOptions,
  ExpressCassandraModuleOptions,
} from './interfaces/module-options.interface';
import getConnectionName from './utils/get-connection-name';

@Module({})
export class ExpressCassandraCoreModule {
  private readonly logger = new Logger(ExpressCassandraModule.name);

  constructor(
    @Inject(EXPRESS_CASSANDRA_MODULE_OPTIONS)
    private readonly options: ExpressCassandraModuleOptions,
  ) {}

  static forRoot(options: ExpressCassandraModuleOptions): DynamicModule {
    const moduleOptions = {
      provide: EXPRESS_CASSANDRA_MODULE_OPTIONS,
      useValue: options,
    };

    const connectionProvider = {
      provide: getConnectionName(options),
      useFactory: async () => await this.createConnectionFactory(options),
    };

    return {
      module: ExpressCassandraCoreModule,
      providers: [connectionProvider, moduleOptions],
      exports: [connectionProvider],
    };
  }

  static forRootAsync(
    options: ExpressCassandraModuleAsyncOptions,
  ): DynamicModule {
    const asyncProviders = this.createAsyncProviders(options);
    return {
      module: ExpressCassandraCoreModule,
      imports: options.imports,
      providers: [
        ...asyncProviders,
        {
          provide: EXPRESS_CASSANDRA_MODULE_ID,
          useValue: nanoid(),
        },
      ],
      exports: [],
    };
  }

  private static createAsyncProviders(
    options: ExpressCassandraModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass;
    return useClass
      ? [
          this.createAsyncOptionsProvider(options),
          {
            provide: useClass,
            useClass,
          },
        ]
      : [this.createAsyncOptionsProvider(options)];
  }

  private static createAsyncOptionsProvider(
    options: ExpressCassandraModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: EXPRESS_CASSANDRA_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    const inject = options.useClass
      ? [options.useClass]
      : options.useExisting
      ? [options.useExisting]
      : [];
    return {
      provide: EXPRESS_CASSANDRA_MODULE_OPTIONS,
      useFactory: async (optionsFactory) =>
        await optionsFactory.createExpressCassandraOptions(options.name),
      inject,
    };
  }

  private static async createConnectionFactory(
    options: ExpressCassandraModuleOptions,
  ): Promise<Connection> {
    const { ...cassandraOptions } = options;
    const connection = new ExpressCassandraClient(cassandraOptions);

    return await lastValueFrom(
      defer(() => connection.initAsync()).pipe(map(() => connection)),
    );
  }
}
