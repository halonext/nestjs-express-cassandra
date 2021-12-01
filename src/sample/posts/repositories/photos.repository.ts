import { BaseRepository } from '../../../base-repository';
import { Repository } from '../../../decorators/repository.decorator';
import { PhotoEntity } from '../entities/photo.entity';

@Repository(PhotoEntity)
export class PhotosRepository extends BaseRepository<PhotoEntity> {
  constructor() {
    super();
  }
}
