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

  it(`should return created entity`, () => {
    return request(server).post('/posts').send(payload).expect(201, payload);
  });

  it(`should throw 400 exception send post invalid body`, () => {
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

  it(`should return list of posts`, () => {
    return request(server).get('/posts').expect(200, [payload]);
  });

  it(`should throw 400 exception when query wrong field`, () => {
    return request(server)
      .get('/posts?content=foo')
      .then((res) => {
        expect(res.body).toMatchObject({
          statusCode: 400,
          message: 'Could not get posts',
        });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
