import {
  EntityOptions,
  ExtendedEntityOptions,
} from '../interfaces/decorators.interface';
import { addEntityOptions, setEntityName } from '../utils/metadata';

export function Entity<T>(options: EntityOptions<T>): ClassDecorator {
  return (target): void => {
    const extended = {
      ...options,
      instanceMethods: target.prototype,
      classMethods: target,
    };

    const entityName = options.name || target.name;

    setEntityName(target.prototype, entityName);
    addEntityOptions<ExtendedEntityOptions<T>>(target.prototype, extended);
  };
}

export function VersionColumn(): PropertyDecorator {
  return (target, propertyName) => {
    addEntityOptions(target, { options: { versions: { key: propertyName } } });
  };
}

export function CreateDateColumn(): PropertyDecorator {
  return (target: object, propertyName: string | symbol) => {
    addEntityOptions(target, {
      options: { timestamps: { createdAt: propertyName } },
    });
  };
}

export function UpdateDateColumn(): PropertyDecorator {
  return (target: object, propertyName: string | symbol) => {
    addEntityOptions(target, {
      options: { timestamps: { updatedAt: propertyName } },
    });
  };
}
