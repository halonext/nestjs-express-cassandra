import { FunctionType } from '../interfaces/decorators.interface';
import { setEntityMetadata } from '../utils/metadata';

export function Repository(entity: FunctionType): ClassDecorator {
  return (target) => {
    setEntityMetadata(target.prototype, entity);
  };
}
