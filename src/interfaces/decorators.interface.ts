/* eslint-disable @typescript-eslint/ban-types */

import { ColumnType } from './cassandra.interface';

export interface EntityOptions<T = object> {
  name?: string;
  table_name?: string;
  key: Array<keyof T | Array<keyof T>>;
  indexes?: Array<keyof T> | string[];
}

export interface ExtendedEntityOptions<T = object> extends EntityOptions<T> {
  instanceMethods: unknown;
  classMethods: unknown;
}

export interface ColumnOptions {
  type?: ColumnType;
  rule?: ColumnRuleOptions;
}

export interface ColumnRuleOptions {
  required?: boolean;
}

export type FunctionType = Function;

export type ObjectType = Object;

export type TargetType = Object;

export type ColumnsType = Record<string, ColumnOptions>;
