import { FunctionType } from '../interfaces/decorators.interface';
import { setEntity } from '../utils/metadata';

export function Repository(entity: FunctionType): ClassDecorator {
  return (target) => {
    setEntity(target.prototype, entity);
  };
}
