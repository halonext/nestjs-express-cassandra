import { Column } from '../../../decorators/column.decorator';
import { Entity } from '../../../decorators/entity.decorator';

@Entity<PhotoEntity>({
  key: [['workspaceId', 'channelId'], 'bucketId', 'photoId'],
  materialized_views: {
    photo_by_bucket: {
      key: [['bucketId'], 'workspaceId', 'channelId', 'photoId'],
      select: ['*'],
    },
  },
  clustering_order: {
    bucketId: 'asc',
    photoId: 'asc',
  },
})
export class PhotoEntity {
  @Column({
    type: 'int',
  })
  workspaceId!: number;

  @Column({
    type: 'int',
  })
  channelId!: number;

  @Column({
    type: 'int',
  })
  bucketId!: number;

  @Column({
    type: 'int',
  })
  photoId!: number;
}
