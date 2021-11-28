import { Column } from '../../../decorators/column.decorator';
import { Entity } from '../../../decorators/entity.decorator';

@Entity<PhotoEntity>({
  key: ['photoId'],
})
export class PhotoEntity {
  @Column({
    type: 'text',
  })
  photoId!: string;
}
