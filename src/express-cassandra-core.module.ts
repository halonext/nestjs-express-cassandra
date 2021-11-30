import {
  DynamicModule,
  Global,
  Inject,
  Logger,
  Module,
  OnModuleDestroy,
  Provider,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { nanoid } from 'nanoid';

import Connection from './connection';
import {
  EXPRESS_CASSANDRA_MODULE_ID,
  EXPRESS_CASSANDRA_MODULE_OPTIONS,
} from './constants';
import { ExpressCassandraModule } from './express-cassandra.module';
import {
  ExpressCassandraModuleAsyncOptions,
  ExpressCassandraModuleOptions,
} from './interfaces/module-options.interface';
import { createNewConnection } from './utils/connection';
import { getConnectionProviderName } from './utils/providers';

@Global()
@Module({})
export class ExpressCassandraCoreModule implements OnModuleDestroy {
  private readonly logger = new Logger(ExpressCassandraModule.name);

  constructor(
    @Inject(EXPRESS_CASSANDRA_MODULE_OPTIONS)
    private readonly options: ExpressCassandraModuleOptions,
    private readonly moduleRef: ModuleRef,
  ) {}

  async onModuleDestroy(): Promise<void> {
    if (this.options.keepConnectionAlive) {
      return;
    }
    const connection = this.moduleRef.get<Connection>(
      getConnectionProviderName(this.options),
    );
    if (connection) {
      await connection.closeAsync();
      this.logger.log(`[${connection.name}] Connection closed`);
    }
  }

  static forRoot(options: ExpressCassandraModuleOptions): DynamicModule {
    const moduleOptions = {
      provide: EXPRESS_CASSANDRA_MODULE_OPTIONS,
      useValue: options,
    };

    const connectionProvider = {
      provide: getConnectionProviderName(options),
      useFactory: async () => await createNewConnection(options),
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
    const connectionProvider = {
      provide: getConnectionProviderName(options),
      useFactory: async (typeormOptions: ExpressCassandraModuleOptions) => {
        return await createNewConnection(typeormOptions);
      },
      inject: [EXPRESS_CASSANDRA_MODULE_OPTIONS],
    };
    const asyncProviders = this.createAsyncProviders(options);
    return {
      module: ExpressCassandraCoreModule,
      imports: options.imports,
      providers: [
        connectionProvider,
        ...asyncProviders,
        {
          provide: EXPRESS_CASSANDRA_MODULE_ID,
          useValue: nanoid(),
        },
      ],
      exports: [connectionProvider],
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
        optionsFactory
          ? await optionsFactory.createExpressCassandraOptions(options.name)
          : null,
      inject,
    };
  }
}
