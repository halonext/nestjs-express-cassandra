import { merge } from 'lodash';

import {
  ENTITY_ATTRIBUTE_KEY,
  ENTITY_METADATA,
  ENTITY_NAME_KEY,
  ENTITY_OPTIONS_KEY,
} from '../constants';
import { FunctionType, TargetType } from '../interfaces/decorators.interface';

export function setEntity(target: TargetType, entity: FunctionType): void {
  Reflect.defineMetadata(ENTITY_METADATA, entity, target);
}

export function getEntity(target: TargetType): FunctionType {
  return Reflect.getMetadata(ENTITY_METADATA, target);
}

export function setEntityName(target: TargetType, name: string): void {
  Reflect.defineMetadata(ENTITY_NAME_KEY, name, target);
}

export function getOptions<T>(target: TargetType): T | undefined {
  const options = Reflect.getMetadata(ENTITY_OPTIONS_KEY, target);
  return { ...options } || {};
}

export function setOptions<T>(target: TargetType, options: T): void {
  Reflect.defineMetadata(ENTITY_OPTIONS_KEY, { ...options }, target);
}

export function addOptions<T>(target: TargetType, options: T): void {
  const prev = getOptions(target) || {};
  setOptions(target, merge(prev, options));
}

export function getAttributes<T>(target: TargetType): T | undefined {
  return Reflect.getMetadata(ENTITY_ATTRIBUTE_KEY, target);
}

export function setAttributes<T>(target: TargetType, attrs: T): void {
  Reflect.defineMetadata(ENTITY_ATTRIBUTE_KEY, { ...attrs }, target);
}

export function addAttribute<T>(
  target: TargetType,
  name: string,
  options: unknown,
): void {
  const attrs = getAttributes<T>(target);
  setAttributes<T>(target, Object.assign(attrs, { [name]: options }));
}
