import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Server } from 'http';
import * as request from 'supertest';

import { SampleModule } from '../../src/sample/sample.module';

describe('ExpressCassandraModule', () => {
  let server: Server;
  let app: INestApplication;

  const payload = {
    title: 'Express Cassandra',
    content: 'A NestJS module',
  };

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [SampleModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    server = app.getHttpServer();

    await app.init();
  });

  it(`CREATE: should return created entity`, () => {
    return request(server).post('/posts').send(payload).expect(201, payload);
  });

  it(`CREATE: should throw 400 exception with invalid body`, () => {
    const invalid = { content: 'A NestJS module' };

    return request(server)
      .post('/posts')
      .send(invalid)
      .then((res) => {
        expect(res.body).toMatchObject({
          statusCode: 400,
          message: 'Could not save post',
          error: 'Primary Key Field: title must have a value',
        });
      });
  });

  it(`FIND: should return list of posts`, () => {
    return request(server).get('/posts').expect(200, [payload]);
  });

  it(`FIND: should throw 400 exception when query wrong field`, () => {
    return request(server)
      .get('/posts?content=foo')
      .then((res) => {
        expect(res.body).toMatchObject({
          statusCode: 400,
          message: 'Could not get posts',
        });
      });
  });

  it(`UPDATE: should return updated rows count`, () => {
    const updated = {
      title: 'Express Cassandra',
      content: 'A NestJS module (v2)',
    };

    return request(server)
      .put('/posts')
      .send(updated)
      .expect(200, { updated: 1 });
  });

  it(`UPDATE: should return 0 updated rows`, () => {
    const updated = {
      title: 'Express Cassandra 2',
      content: 'A NestJS module (v2)',
    };

    return request(server)
      .put('/posts')
      .send(updated)
      .expect(200, { updated: 0 });
  });

  afterAll(async () => {
    await app.close();
  });
});
