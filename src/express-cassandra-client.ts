// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as ExpressCassandra from 'express-cassandra';

import {
  Connection,
  ConnectionOptions,
} from './interfaces/connection.interface';

interface ExpressCassandraClient extends FunctionConstructor {
  new (options: ConnectionOptions): Connection;

  initAsync(): Promise<void>;
}

const ExpressCassandraClient: ExpressCassandraClient = ExpressCassandra;

export default ExpressCassandraClient;
