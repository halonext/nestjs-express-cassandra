// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as ExpressCassandra from 'express-cassandra';

import { ConnectionOptions } from './interfaces/connection.interface';
import { BaseModel } from './interfaces/orm.interface';

interface Connection extends FunctionConstructor {
  new (options: ConnectionOptions): typeof Connection;

  name?: string;

  initAsync(): Promise<void>;

  closeAsync(): Promise<void>;

  loadSchema<T>(modelName: string, modelSchema: T): BaseModel<T>;
}

const Connection: Connection = ExpressCassandra;

export default Connection;
