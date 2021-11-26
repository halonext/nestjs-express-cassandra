import {
  DynamicModule,
  Inject,
  Logger,
  Module,
  Provider,
} from '@nestjs/common';
import { nanoid } from 'nanoid';

import {
  EXPRESS_CASSANDRA_MODULE_ID,
  EXPRESS_CASSANDRA_MODULE_OPTIONS,
} from './constants';
import { ExpressCassandraModule } from './express-cassandra.module';
import {
  ExpressCassandraModuleAsyncOptions,
  ExpressCassandraModuleOptions,
} from './interfaces/module-options.interface';

@Module({})
export class ExpressCassandraCoreModule {
  private readonly logger = new Logger(ExpressCassandraModule.name);

  constructor(
    @Inject(EXPRESS_CASSANDRA_MODULE_OPTIONS)
    private readonly options: ExpressCassandraModuleOptions,
  ) {}

  static forRoot(options: ExpressCassandraModuleOptions = {}): DynamicModule {
    const moduleOptions = {
      provide: EXPRESS_CASSANDRA_MODULE_OPTIONS,
      useValue: options,
    };

    return {
      module: ExpressCassandraCoreModule,
      providers: [moduleOptions],
      exports: [],
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
}
