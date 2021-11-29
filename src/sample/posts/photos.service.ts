import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import { InjectRepository } from '../../decorators/inject-repository.decorator';
import { Repository } from '../../repository';
import { PhotoEntity } from './entities/photo.entity';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(PhotoEntity)
    private readonly posts: Repository<PhotoEntity>,
  ) {}

  async findByIds(categoryIds: number[]): Promise<PhotoEntity[] | Error> {
    return await lastValueFrom(
      this.posts.find({ photoId: { $in: categoryIds } }),
    );
  }

  async create(
    photos: { photoId: number; authorId: string; categoryId: number }[],
  ): Promise<PhotoEntity[] | Error> {
    return await lastValueFrom(this.posts.bulkSave(photos));
  }
}
