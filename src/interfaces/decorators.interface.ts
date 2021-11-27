export interface EntityOptions<T = object> {
  name?: string;
  table_name?: string;
  key?: Array<keyof T | Array<keyof T>>;
}

export interface ExtendedEntityOptions<T> extends EntityOptions<T> {
  instanceMethods: unknown;
  classMethods: unknown;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type FunctionType = Function;

export type TargetType = typeof Function.prototype;
