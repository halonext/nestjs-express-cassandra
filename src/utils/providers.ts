import { Provider, Type } from '@nestjs/common';

import { BaseRepository } from '../base-repository';
import Connection from '../connection';
import { DEFAULT_CONNECTION_NAME } from '../constants';
import { ConnectionOptions } from '../interfaces/connection.interface';
import { FunctionType } from '../interfaces/decorators.interface';
import { ExpressCassandraModuleAsyncOptions } from '../interfaces/module-options.interface';
import { BaseModel } from '../interfaces/orm.interface';
import { getEntityMetadata } from './metadata';
import { createRepository, loadSchema } from './orm';

export function getModelProviderName(entity: FunctionType): string {
  return `${entity.name}Model`;
}

export function getConnectionProviderName(
  connection:
    | ConnectionOptions
    | ExpressCassandraModuleAsyncOptions
    | string = DEFAULT_CONNECTION_NAME,
): string {
  return DEFAULT_CONNECTION_NAME === connection
    ? DEFAULT_CONNECTION_NAME
    : 'string' === typeof connection
    ? `${connection}Connection`
    : !connection.name
    ? DEFAULT_CONNECTION_NAME
    : `${connection.name}Connection`;
}

export function getRepositoryProviderName<T>(entity: Type<T>): string {
  if (entity.prototype instanceof BaseRepository) {
    return entity.name;
  }
  return `${entity.name}Repository`;
}

export default function createFeatureProviders<T>(
  entities: Type<T>[],
  connection: string,
): Provider[] {
  const createModelProvider = (entity: Type<T>) => ({
    provide: getModelProviderName(entity),
    useFactory: async (connection: Connection) => {
      return loadSchema<T>(connection, entity);
    },
    inject: [getConnectionProviderName(connection)],
  });

  const createRepositoryProvider = (entity: Type<T>) => ({
    provide: getRepositoryProviderName(entity),
    useFactory: async (model: BaseModel<T>) =>
      createRepository<T>(entity, model),
    inject: [getModelProviderName(entity)],
  });

  const createCustomRepositoryProvider = (repository: Type<T>) => {
    const entity = getEntityMetadata<T>(repository.prototype);
    return {
      provide: getRepositoryProviderName(repository),
      useFactory: async (model: BaseModel<T>) =>
        createRepository<T>(entity, model, repository),
      inject: [getModelProviderName(entity)],
    };
  };

  const providers: Provider[] = [];
  entities.forEach((entity) => {
    if (entity.prototype instanceof BaseRepository) {
      providers.push(createCustomRepositoryProvider(entity));
    } else {
      providers.push(
        createModelProvider(entity),
        createRepositoryProvider(entity),
      );
    }
  });

  return providers;
}
