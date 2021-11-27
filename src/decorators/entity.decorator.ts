import {
  EntityOptions,
  ExtendedEntityOptions,
} from '../interfaces/decorators.interface';
import { addOptions, setEntityName } from '../utils/metadata';

export function Entity<T = object>(options: EntityOptions<T>): ClassDecorator {
  return (target): void => {
    const extended = {
      ...options,
      instanceMethods: target.prototype,
      classMethods: target,
    };

    const entityName = options.name || target.name;

    setEntityName(target.prototype, entityName);
    addOptions<ExtendedEntityOptions<T>>(target.prototype, extended);
  };
}
