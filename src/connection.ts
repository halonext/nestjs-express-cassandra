// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as ExpressCassandra from 'express-cassandra';

import { ConnectionOptions } from './interfaces/connection.interface';
import {
  ColumnsType,
  ExtendedEntityOptions,
} from './interfaces/decorators.interface';
import { BaseModelStatic } from './interfaces/orm.interface';

interface Connection extends FunctionConstructor {
  new (options: ConnectionOptions): typeof Connection;

  name?: string;

  initAsync(): Promise<void>;

  closeAsync(): Promise<void>;

  loadSchema<T>(
    modelName: string,
    modelSchema: ExtendedEntityOptions & { fields: ColumnsType },
  ): BaseModelStatic<T>;
}

const Connection: Connection = ExpressCassandra;

export default Connection;
