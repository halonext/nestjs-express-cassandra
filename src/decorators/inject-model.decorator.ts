import { Inject, Type } from '@nestjs/common';

import { getModelProviderName } from '../utils/providers';

export const InjectModel = (
  entity: Type,
): ((target: object, key: string | symbol, index?: number) => void) =>
  Inject(getModelProviderName(entity));
