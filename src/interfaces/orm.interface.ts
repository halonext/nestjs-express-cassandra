import { types } from 'cassandra-driver';

export interface SaveOptions {
  ttl?: number;
  if_not_exist?: boolean;
}

export interface BaseModelStatic<T> {
  new (props: T): BaseModel<T> & T;

  syncDB(callback?: (err: Error | null, result: boolean) => void): void;

  findAsync(
    query: FindQuery<T>,
    options: FindQueryOptions<T> & { raw: true },
  ): Promise<T[]>;

  findAsync(
    query: FindQuery<T>,
    options?: FindQueryOptions<T>,
  ): Promise<BaseModel<T>[]>;

  findOneAsync(
    query: FindQuery<T>,
    options?: FindQueryOptions<T>,
  ): Promise<BaseModel<T>>;

  updateAsync(
    query: FindQuery<T>,
    updateValue: Partial<T>,
    options?: UpdateOptions<T>,
  ): Promise<types.ResultSet>;

  deleteAsync(
    query: FindQuery<T>,
    options?: DeleteOptions,
  ): Promise<types.ResultSet>;
}

export interface BaseModel<T> extends BaseModelStatic<T> {
  saveAsync(options?: SaveOptions): Promise<T>;

  toJSON(): T;
}

export type FindQuery<Entity> = {
  [KEY in keyof Entity]?: Entity[KEY] | CqlOperatorOptions<Entity[KEY]>;
} & CqlPaginationOptions<Entity>;

export interface FindQueryOptions<T> {
  select?: (string | keyof T)[];
  materialized_view?: string;
}

export interface CqlPaginationOptions<Entity> {
  $orderby?: {
    $asc?: keyof Entity | Array<keyof Entity>;
    $desc?: keyof Entity | Array<keyof Entity>;
  };
  $limit?: number;
}

export interface CqlOperatorOptions<T> {
  $eq?: T;
  $ne?: T;
  $isnt?: T;
  $gt?: T;
  $lt?: T;
  $gte?: T;
  $lte?: T;
  $in?: T[];
  $like?: string;
  $token?: T;
  $contains?: string;
  $contains_key?: string[];
}

export interface UpdateOptions<T> {
  ttl?: number;
  if_exists?: boolean;
  conditions?: { [P in keyof T]?: T[P] };
}

export interface DeleteOptions {
  if_exists?: boolean;
}
