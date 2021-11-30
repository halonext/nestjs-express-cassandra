/* eslint-disable @typescript-eslint/ban-types */

import { ColumnType } from './cassandra.interface';
import { CqlOperatorOptions } from './orm.interface';

export type ClusterOrder<Entity> = { [KEY in keyof Entity]?: 'desc' | 'asc' };

type FilterOptions<Entity> = Partial<{
  [KEY in keyof Entity]: CqlOperatorOptions<Entity[KEY]>;
}>;

export interface EntityOptions<T = object> {
  name?: string;
  table_name?: string;
  key: Array<keyof T | Array<keyof T>>;
  indexes?: Array<keyof T> | string[];
  clustering_order?: ClusterOrder<T>;
  materialized_views?: Record<string, MaterializeViewOptions<T>>;
}

export interface ExtendedEntityOptions<T = object> extends EntityOptions<T> {
  instanceMethods: unknown;
  classMethods: unknown;
}

export interface MaterializeViewOptions<T> {
  key: Array<keyof T | Array<keyof T>>;
  select: Array<keyof T | '*'>;
  clustering_order?: ClusterOrder<T>;
  filter?: FilterOptions<T>;
}

export interface ColumnOptions {
  type?: ColumnType;
  default?: string | (() => string) | Function | { $db_function: string };
  rule?: ColumnRuleOptions;
}

export interface ColumnRuleOptions {
  required?: boolean;
}

export type FunctionType = Function;

export type ObjectType = Object;

export type TargetType = Object;

export type ColumnsType = Record<string, ColumnOptions>;
