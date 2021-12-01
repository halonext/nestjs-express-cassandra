import { ModuleMetadata, Type } from '@nestjs/common';
import { FactoryProvider } from '@nestjs/common/interfaces/modules/provider.interface';

import Connection from '../connection';
import { ConnectionOptions } from './connection.interface';

export interface ExpressCassandraModuleOptions extends ConnectionOptions {
  keepConnectionAlive?: boolean;
}

export interface ExpressCassandraOptionsFactory {
  createExpressCassandraOptions(
    connectionName?: string,
  ): Promise<ExpressCassandraModuleOptions> | ExpressCassandraModuleOptions;
}

export type ExpressCassandraConnectionFactory = (
  options?: ConnectionOptions,
) => Promise<Connection>;

export interface ExpressCassandraModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'>,
    Pick<FactoryProvider, 'inject'> {
  name?: string;
  useExisting?: Type<ExpressCassandraOptionsFactory>;
  useClass?: Type<ExpressCassandraOptionsFactory>;
  useFactory?: (
    ...args: never[]
  ) => Promise<ExpressCassandraModuleOptions> | ExpressCassandraModuleOptions;
  connectionFactory?: ExpressCassandraConnectionFactory;
}
