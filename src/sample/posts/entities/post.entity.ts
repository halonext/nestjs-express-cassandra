import { Column } from '../../../decorators/column.decorator';
import { Entity } from '../../../decorators/entity.decorator';

@Entity<PostEntity>({
  key: ['postId'],
})
export class PostEntity {
  @Column({
    type: 'int',
  })
  postId!: number;

  @Column({
    type: 'text',
    rule: { required: true },
  })
  title!: string;

  @Column({
    type: 'text',
  })
  content?: string;
}
