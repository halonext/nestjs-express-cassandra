import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Server } from 'http';
import * as request from 'supertest';

import { FeaturesModule } from '../../src/sample/features.module';
import { PhotoEntity } from '../../src/sample/posts/entities/photo.entity';

describe('Advanced Query & Operators', () => {
  let server: Server;
  let app: INestApplication;

  const payload: PhotoEntity[] = [
    {
      workspaceId: 0,
      channelId: 1,
      bucketId: 1,
      photoId: 1,
    },
    {
      workspaceId: 0,
      channelId: 1,
      bucketId: 1,
      photoId: 2,
    },
    {
      workspaceId: 0,
      channelId: 1,
      bucketId: 2,
      photoId: 3,
    },
    {
      workspaceId: 0,
      channelId: 1,
      bucketId: 2,
      photoId: 4,
    },
    {
      workspaceId: 0,
      channelId: 1,
      bucketId: 3,
      photoId: 5,
    },
    {
      workspaceId: 1,
      channelId: 2,
      bucketId: 3,
      photoId: 6,
    },
    {
      workspaceId: 1,
      channelId: 2,
      bucketId: 3,
      photoId: 7,
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
      .get('/photos?workspaceIds=0,1')
      .then((res) => {
        expect(res.body).toMatchObject(payload.slice(0, 5));
      });
  });

  it(`$GT: should return greater entities`, () => {
    return request(server)
      .get('/query?type=from&id=3')
      .then((res) => {
        expect(res.body).toMatchObject(payload.slice(3, 5));
      });
  });

  it(`$LT: should return smaller entities`, () => {
    return request(server)
      .get('/query?type=to&id=3')
      .then((res) => {
        expect(res.body).toMatchObject(payload.slice(0, 2));
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
