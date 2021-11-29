import { Column } from '../../../decorators/column.decorator';
import { Entity } from '../../../decorators/entity.decorator';

@Entity<PhotoEntity>({
  key: ['photoId'],
})
export class PhotoEntity {
  @Column({
    type: 'int',
  })
  photoId!: number;

  @Column({
    type: 'text',
  })
  authorId!: string;

  @Column({
    type: 'int',
  })
  categoryId!: number;
}
