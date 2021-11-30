import { Logger } from '@nestjs/common';
import { defer, lastValueFrom, map } from 'rxjs';

import Connection from '../connection';
import { ExpressCassandraCoreModule } from '../express-cassandra-core.module';
import { ExpressCassandraModuleOptions } from '../interfaces/module-options.interface';
import { getConnectionProviderName } from './providers';

export function createNewConnection(
  options: ExpressCassandraModuleOptions,
): Promise<Connection> {
  const { ...cassandraOptions } = options;
  const connection = new Connection(cassandraOptions);

  connection.name = getConnectionProviderName(options);

  return lastValueFrom(
    defer(() => connection.initAsync()).pipe(
      map(() => {
        Logger.debug(
          `[${connection.name}] connection initialized`,
          ExpressCassandraCoreModule.name,
        );
        return connection;
      }),
    ),
  );
}
