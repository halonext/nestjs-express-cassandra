import { Type } from '@nestjs/common';
import { merge } from 'lodash';

import {
  ENTITY_COLUMNS_KEY,
  ENTITY_METADATA_KEY,
  ENTITY_NAME_KEY,
  ENTITY_OPTIONS_KEY,
} from '../constants';
import {
  ColumnOptions,
  ColumnsType,
  FunctionType,
  ObjectType,
  TargetType,
} from '../interfaces/decorators.interface';

export function setEntityMetadata(
  target: TargetType,
  entity: FunctionType,
): void {
  Reflect.defineMetadata(ENTITY_METADATA_KEY, entity, target);
}

export function getEntityMetadata<T>(target: TargetType): Type<T> {
  return Reflect.getMetadata(ENTITY_METADATA_KEY, target);
}

export function setEntityName(target: TargetType, name: string): void {
  Reflect.defineMetadata(ENTITY_NAME_KEY, name, target);
}

export function getEntityOptions<T>(target: TargetType): T | undefined {
  return Reflect.getMetadata(ENTITY_OPTIONS_KEY, target);
}

export function setEntityOptions<T>(target: TargetType, options: T): void {
  Reflect.defineMetadata(ENTITY_OPTIONS_KEY, { ...options }, target);
}

export function addEntityOptions<T>(target: TargetType, options: T): void {
  const prev = getEntityOptions(target) || {};
  setEntityOptions(target, merge(prev, options));
}

export function getEntityColumns<T = ColumnsType>(
  target: ObjectType,
): T | undefined {
  return Reflect.getMetadata(ENTITY_COLUMNS_KEY, target);
}

export function setEntityColumns<T = ColumnsType>(
  target: ObjectType,
  attrs: T,
): void {
  Reflect.defineMetadata(ENTITY_COLUMNS_KEY, { ...attrs }, target);
}

export function addEntityColumn(
  target: ObjectType,
  name: string | symbol,
  options: ColumnOptions,
): void {
  const attrs = getEntityColumns(target);
  setEntityColumns(target, { ...attrs, [name]: options });
}
