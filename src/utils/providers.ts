import { Provider } from '@nestjs/common';

import { DEFAULT_CONNECTION_NAME } from '../constants';
import {
  Connection,
  ConnectionOptions,
} from '../interfaces/connection.interface';
import { FunctionType } from '../interfaces/decorators.interface';
import { loadModel } from './orm';

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

export default function createFeatureProviders(
  entities: FunctionType[],
  connection: string,
): Provider[] {
  const providerModel = (entity: FunctionType) => ({
    provide: getModelProviderName(entity),
    useFactory: async (connection: Connection) => {
      return loadModel(connection, entity);
    },
    inject: [getConnectionProviderName(connection)],
  });

  const providers: Provider[] = [];
  entities.forEach((entity) => {
    providers.push(providerModel(entity));
  });

  return providers;
}
