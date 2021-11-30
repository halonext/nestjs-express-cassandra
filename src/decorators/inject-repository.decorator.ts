import { Inject, Type } from '@nestjs/common';

import { getRepositoryProviderName } from '../utils/providers';

export const InjectRepository = (
  entity: Type,
): ((target: object, key: string | symbol, index?: number) => void) =>
  Inject(getRepositoryProviderName(entity));
