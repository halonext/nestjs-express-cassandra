import { Logger } from '@nestjs/common';

import Connection from '../connection';
import {
  ColumnsType,
  ExtendedEntityOptions,
  FunctionType,
} from '../interfaces/decorators.interface';
import { BaseModel } from '../interfaces/orm.interface';
import { getEntityColumns, getEntityOptions } from './metadata';

export async function loadModel<T>(
  connection: Connection,
  entity: FunctionType,
): Promise<BaseModel<T>> {
  const schema = getSchema(entity);
  const modelName = schema.name || entity.name;
  const model = connection.loadSchema(modelName, schema);

  return new Promise((resolve, reject) => {
    model.syncDB((err) => {
      if (err) {
        Logger.error(err.message, 'ExpressCassandraModule');
        return reject(model);
      }

      return resolve(model);
    });
  });
}

export function getSchema(
  entity: FunctionType,
): ExtendedEntityOptions & { fields: ColumnsType } {
  const fields = getEntityColumns(entity.prototype);
  const options = getEntityOptions<ExtendedEntityOptions>(entity.prototype);
  const modelName = options?.name || entity.name;

  if (!options) {
    throw new Error(`No entity options found for "${modelName}".`);
  }

  if (!fields) {
    throw new Error(`No column options found for "${modelName}"..`);
  }

  return { ...options, fields };
}
