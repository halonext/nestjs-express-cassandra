import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Server } from 'http';
import * as request from 'supertest';

import { FeaturesModule } from '../../src/sample/features.module';

describe('Advanced Query & Operators', () => {
  let server: Server;
  let app: INestApplication;

  const payload = [
    {
      photoId: 1,
      authorId: '1',
      categoryId: 1,
    },
    {
      photoId: 2,
      authorId: '2',
      categoryId: 2,
    },
    {
      photoId: 3,
      authorId: '2',
      categoryId: 2,
    },
    {
      photoId: 4,
      authorId: '3',
      categoryId: 3,
    },
    {
      photoId: 5,
      authorId: '3',
      categoryId: 3,
    },
  ];

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [FeaturesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    server = app.getHttpServer();

    await app.init();
  });

  it(`BULK_ADD: should return created entities`, () => {
    return request(server)
      .post('/photos')
      .send(payload)
      .then((res) => {
        expect(res.body).toMatchObject(payload);
      });
  });

  it(`$IN: should return matched entities`, () => {
    return request(server)
      .get('/photos')
      .then((res) => {
        expect(res.body).toMatchObject([
          {
            photoId: 2,
            authorId: '2',
            categoryId: 2,
          },
          {
            photoId: 4,
            authorId: '3',
            categoryId: 3,
          },
        ]);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
