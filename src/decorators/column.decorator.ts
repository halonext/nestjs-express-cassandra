import { ColumnOptions } from '../interfaces/decorators.interface';
import { addEntityColumn, addEntityOptions } from '../utils/metadata';

export function Column(options: ColumnOptions): PropertyDecorator {
  return (target, propertyName) => {
    addEntityColumn(target, propertyName, options);
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

export function TimeUUIDColumn(): PropertyDecorator {
  return (target, propertyName) => {
    addEntityColumn(target, propertyName, {
      type: 'timeuuid',
      default: { $db_function: 'now()' },
    });
  };
}

export function UUIDColumn(): PropertyDecorator {
  return (target, propertyName) => {
    addEntityColumn(target, propertyName, {
      type: 'uuid',
      default: { $db_function: 'uuid()' },
    });
  };
}
