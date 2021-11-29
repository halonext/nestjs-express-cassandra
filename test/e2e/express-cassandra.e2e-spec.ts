import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Server } from 'http';
import * as request from 'supertest';

import { SampleModule } from '../../src/sample/sample.module';

describe('ExpressCassandraModule', () => {
  let server: Server;
  let app: INestApplication;

  const payload = {
    postId: 1,
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
    return request(server)
      .post('/posts')
      .send(payload)
      .then((res) => {
        expect(res.body).toMatchObject(payload);
      });
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
          error: 'Required Field: title must have a value',
        });
      });
  });

  it(`LIST: should return list of posts`, () => {
    return request(server)
      .get('/posts')
      .then((res) => {
        expect(res.body).toMatchObject([payload]);
      });
  });

  it(`LIST: should throw 400 exception when query wrong field`, () => {
    return request(server)
      .get('/posts?content=foo')
      .then((res) => {
        expect(res.body).toMatchObject({
          statusCode: 400,
          message: 'Could not get posts',
        });
      });
  });

  it(`GET: should return correct post by postId`, () => {
    return request(server)
      .get('/posts/1')
      .then((res) => {
        expect(res.body).toMatchObject(payload);
      });
  });

  it(`UPDATE: should return updated rows count when update valid post`, () => {
    const updated = {
      title: 'Express Cassandra',
      content: 'A NestJS module (v2)',
    };

    return request(server)
      .put('/posts/1')
      .send(updated)
      .expect(200, { updated: 1 });
  });

  it(`UPDATE: should return 0 updated rows when update invalid post`, () => {
    const updated = {
      title: 'Express Cassandra',
      content: 'A NestJS module (v2)',
    };

    return request(server)
      .put('/posts/2')
      .send(updated)
      .expect(200, { updated: 0 });
  });

  it(`DELETE: should delete post`, () => {
    return request(server).delete('/posts/1').expect(200, { deleted: true });
  });

  afterAll(async () => {
    await app.close();
  });
});
