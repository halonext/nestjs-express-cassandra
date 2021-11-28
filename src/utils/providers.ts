import { Provider, Type } from '@nestjs/common';

import Connection from '../connection';
import { DEFAULT_CONNECTION_NAME } from '../constants';
import { ConnectionOptions } from '../interfaces/connection.interface';
import { FunctionType } from '../interfaces/decorators.interface';
import { BaseModel } from '../interfaces/orm.interface';
import { Repository } from '../repository';
import { createRepository, loadSchema } from './orm';

export function getModelProviderName(entity: FunctionType): string {
  return `${entity.name}Model`;
}

export function getConnectionProviderName(
  connection: ConnectionOptions | string = DEFAULT_CONNECTION_NAME,
): string {
  return DEFAULT_CONNECTION_NAME === connection
    ? DEFAULT_CONNECTION_NAME
    : 'string' === typeof connection
    ? `${connection}Connection`
    : !connection.name
    ? DEFAULT_CONNECTION_NAME
    : `${connection.name}Connection`;
}

export function getRepositoryProviderName(entity: FunctionType): string {
  if (entity.prototype instanceof Repository) {
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

  // const provideCustomRepository = EntityRepository => {
  //   const entity = getEntity(EntityRepository);
  //   return {
  //     provide: getRepositoryToken(EntityRepository),
  //     useFactory: async model =>
  //       RepositoryFactory.create(entity, model, EntityRepository),
  //     inject: [getModelToken(entity)],
  //   };
  // };

  const providers: Provider[] = [];
  entities.forEach((entity) => {
    providers.push(
      createModelProvider(entity),
      createRepositoryProvider(entity),
    );
  });

  return providers;
}
