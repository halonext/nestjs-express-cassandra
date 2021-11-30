import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';

import { PhotoEntity } from './entities/photo.entity';
import { PhotosService } from './photos.service';

export interface CreatePhotoDTO {
  workspaceId: number;
  channelId: number;
  bucketId: number;
  photoId: number;
}

export interface ConditionQuery {
  type?: 'from' | 'to';
  id?: string;
}

@Controller()
export class PhotosController {
  constructor(private readonly photos: PhotosService) {}

  @Get('/photos')
  async list(@Query('workspaceIds') workspaceIds = ''): Promise<PhotoEntity[]> {
    const ids = workspaceIds.split(',').map((x) => parseInt(x)) || [];
    const result = await this.photos.findByIds(ids);

    if (result instanceof Error) {
      throw new BadRequestException('Could not get posts', result.message);
    }

    return result;
  }

  @Get('/query')
  async conditional(
    @Query() condition: ConditionQuery,
  ): Promise<PhotoEntity[]> {
    if (!condition.id) return [];

    if (condition.type === 'to') {
      const result = await this.photos.findToId(parseInt(condition.id));

      if (result instanceof Error) {
        throw new BadRequestException('Could not get posts', result.message);
      }

      return result;
    }

    const result = await this.photos.findFromId(parseInt(condition.id));

    if (result instanceof Error) {
      throw new BadRequestException('Could not get posts', result.message);
    }

    return result;
  }

  @Post('/photos')
  async create(@Body() photos: CreatePhotoDTO[]): Promise<PhotoEntity[]> {
    const result = await this.photos.create(photos);

    if (result instanceof Error) {
      throw new BadRequestException('Could not save post', result.message);
    }

    return result;
  }
}
