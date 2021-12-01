import { Logger, Type } from '@nestjs/common';

import { BaseRepository } from '../base-repository';
import Connection from '../connection';
import {
  ColumnsType,
  ExtendedEntityOptions,
  FunctionType,
} from '../interfaces/decorators.interface';
import { BaseModel, BaseModelStatic } from '../interfaces/orm.interface';
import { getEntityColumns, getEntityOptions } from './metadata';

export async function loadSchema<T>(
  connection: Connection,
  entity: FunctionType,
): Promise<BaseModelStatic<T>> {
  const schema = getSchema(entity);
  const modelName = schema.name || entity.name;
  const model = connection.loadSchema<T>(modelName, schema);

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

export function createRepository<T>(
  entity: Type<T>,
  model: BaseModel<T>,
  constructor = BaseRepository,
): BaseRepository<T> {
  return new constructor(model, entity);
}
