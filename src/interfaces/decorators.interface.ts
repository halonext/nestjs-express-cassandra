import { ColumnType } from './cassandra.interface';

export interface EntityOptions<T = object> {
  name?: string;
  table_name?: string;
  key: Array<keyof T | Array<keyof T>>;
}

export interface ExtendedEntityOptions<T = object> extends EntityOptions<T> {
  instanceMethods: unknown;
  classMethods: unknown;
}

export interface ColumnOptions {
  type?: ColumnType;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type FunctionType = Function;

// eslint-disable-next-line @typescript-eslint/ban-types
export type ObjectType = Object;

export type TargetType = typeof Function.prototype;

export type ColumnsType = Record<string, ColumnOptions>;