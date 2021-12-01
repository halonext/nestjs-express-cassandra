import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import { BaseRepository } from '../../base-repository';
import { InjectRepository } from '../../decorators/inject-repository.decorator';
import { PhotoEntity } from './entities/photo.entity';
import { CreatePhotoDTO } from './photos.controller';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(PhotoEntity)
    private readonly posts: BaseRepository<PhotoEntity>,
  ) {}

  async findByIds(workspaceIds: number[]): Promise<PhotoEntity[] | Error> {
    return await lastValueFrom(
      this.posts.find({
        workspaceId: { $in: workspaceIds },
        channelId: { $in: [1] },
      }),
    );
  }

  async findFromId(fromId: number): Promise<PhotoEntity[] | Error> {
    return await lastValueFrom(
      this.posts.find({
        workspaceId: 0,
        channelId: 1,
        bucketId: { $in: [1, 2, 3] },
        photoId: { $gt: fromId },
      }),
    );
  }

  async findToId(toId: number): Promise<PhotoEntity[] | Error> {
    return await lastValueFrom(
      this.posts.find({
        workspaceId: 0,
        channelId: 1,
        bucketId: { $in: [1, 2, 3] },
        photoId: { $lt: toId },
      }),
    );
  }

  async create(photos: CreatePhotoDTO[]): Promise<PhotoEntity[] | Error> {
    return await lastValueFrom(this.posts.bulkSave(photos));
  }
}
