import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { PhotoEntity } from './entities/photo.entity';
import { PhotosService } from './photos.service';

interface CreatePhotoDTO {
  photoId: number;
  authorId: string;
  categoryId: number;
}

@Controller()
export class PhotosController {
  constructor(private readonly photos: PhotosService) {}

  @Get('/photos')
  async list(): Promise<PhotoEntity[]> {
    const result = await this.photos.findByIds([2, 4]);

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
