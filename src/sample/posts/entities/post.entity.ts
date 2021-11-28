import { Column } from '../../../decorators/column.decorator';
import { Entity } from '../../../decorators/entity.decorator';

@Entity<PostEntity>({
  key: ['postId'],
})
export class PostEntity {
  @Column({
    type: 'text',
  })
  postId!: string;

  @Column({
    type: 'text',
  })
  content!: string;

  @Column({
    type: 'int',
  })
  authorId!: number;
}
