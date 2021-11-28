import { Type } from '@nestjs/common';
import { catchError, defer, map, Observable, of } from 'rxjs';

import {
  BaseModelStatic,
  FindQuery,
  FindQueryOptions,
  SaveOptions,
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
    }).pipe(catchError((error) => of(error)));
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
      catchError((error) => of(error)),
    );
  }
}
