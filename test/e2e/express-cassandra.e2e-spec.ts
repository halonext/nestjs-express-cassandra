import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Server } from 'http';
import * as request from 'supertest';

import { SampleModule } from '../../src/sample/sample.module';

describe('ExpressCassandraModule', () => {
  let server: Server;
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [SampleModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    server = app.getHttpServer();

    await app.init();
  });

  it(`should return created entity`, () => {
    return request(server)
      .post('/posts')
      .expect(201, { title: 'Express Cassandra', body: 'A NestJS module' });
  });

  afterEach(async () => {
    await app.close();
  });
});
