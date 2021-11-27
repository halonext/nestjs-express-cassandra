import { Connection } from '../interfaces/connection.interface';
import {
  EntityOptions,
  ExtendedEntityOptions,
  FunctionType,
} from '../interfaces/decorators.interface';
import { getAttributes, getOptions } from './metadata';

export async function loadModel(
  connection: Connection,
  entity: FunctionType,
): Promise<void> {
  const schema = getSchema(entity);
  const modelName = schema.name || entity.name;

  // const model = connection.loadSchema(modelName, schema);
  //
  // return new Promise((resolve) => {
  //   model.syncDB((err) => {
  //     if (err) {
  //       Logger.error(err.message, err.stack, 'ExpressCassandraModule');
  //       return resolve(model);
  //     }
  //     return resolve(model);
  //   });
  // });
}

export function getSchema(
  entity: FunctionType,
): EntityOptions & { fields: unknown } {
  const attributes = getAttributes(entity.prototype);
  const options = getOptions<ExtendedEntityOptions<object>>(entity.prototype);

  return { ...options, fields: attributes };
}
