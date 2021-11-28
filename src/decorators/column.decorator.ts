import { ColumnOptions } from '../interfaces/decorators.interface';
import { addEntityColumn } from '../utils/metadata';

export function Column(options: ColumnOptions): PropertyDecorator {
  return (target, propertyName) => {
    addEntityColumn(target, propertyName, options);
  };
}
