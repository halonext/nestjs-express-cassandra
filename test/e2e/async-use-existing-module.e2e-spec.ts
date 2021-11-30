import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Server } from 'http';
import * as request from 'supertest';

import { AsyncUseExistingModule } from '../../src/sample/async-use-existing.module';

describe('AsyncModule - useClass', () => {
  let server: Server;
  let app: INestApplication;

  const payload = {
    postId: 1,
    title: 'Express Cassandra',
    content: 'A NestJS module',
  };

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AsyncUseExistingModule],
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

  afterAll(async () => {
    await app.close();
  });
});
