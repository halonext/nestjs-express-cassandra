import { Type } from '@nestjs/common';
import { types } from 'cassandra-driver';
import { catchError, defer, map, Observable, of } from 'rxjs';

import {
  BaseModelStatic,
  DeleteOptions,
  FindQuery,
  FindQueryOptions,
  SaveOptions,
  UpdateOptions,
} from './interfaces/orm.interface';

export class Repository<Entity> {
  constructor(
    private readonly model: BaseModelStatic<Entity>,
    private readonly target: Type<Entity>,
  ) {}

  create(entity: Entity): Entity {
    return Object.assign(new this.target(), entity);
  }

  save(entity: Entity, options: SaveOptions = {}): Observable<Entity | Error> {
    return defer(async () => {
      const model = new this.model(entity);
      await model.saveAsync(options);
      return Object.assign(new this.target(), model.toJSON());
    }).pipe(catchError((error: Error) => of(error)));
  }

  bulkSave(
    entities: Entity[],
    options: SaveOptions = {},
  ): Observable<Entity[] | Error> {
    return defer(async () => {
      return await Promise.all(
        entities.map(async (entity) => {
          const model = new this.model(entity);
          await model.saveAsync(options);
          return Object.assign(new this.target(), model.toJSON());
        }),
      );
    }).pipe(catchError((error: Error) => of(error)));
  }

  find(
    query: FindQuery<Entity>,
    options: FindQueryOptions<Entity> = {},
  ): Observable<Entity[] | Error> {
    return defer(() =>
      this.model.findAsync(query, {
        ...{ raw: true },
        ...options,
      }),
    ).pipe(
      map((entities) =>
        entities.map((e) => Object.assign(new this.target(), e)),
      ),
      catchError((error: Error) => of(error)),
    );
  }

  findOne(
    query: FindQuery<Entity>,
    options: FindQueryOptions<Entity> = {},
  ): Observable<Entity | Error> {
    return defer(() =>
      this.model.findOneAsync(query, {
        ...{ raw: true },
        ...options,
      }),
    ).pipe(
      map((e) => e && Object.assign(new this.target(), e)),
      catchError((error: Error) => of(error)),
    );
  }

  update(
    query: FindQuery<Entity>,
    updateValue: Partial<Entity>,
    options: UpdateOptions<Entity> = {},
  ): Observable<types.ResultSet | Error> {
    return defer(() =>
      this.model.updateAsync(query, updateValue, {
        ...{ if_exists: true },
        ...options,
      }),
    ).pipe(catchError((error: Error) => of(error)));
  }

  delete(
    query: FindQuery<Entity>,
    options?: DeleteOptions,
  ): Observable<types.ResultSet | Error> {
    return defer(() =>
      this.model.deleteAsync(query, {
        ...{ if_exists: true },
        ...options,
      }),
    ).pipe(catchError((error: Error) => of(error)));
  }
}
