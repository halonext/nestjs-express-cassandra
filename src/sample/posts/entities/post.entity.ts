import { Column } from '../../../decorators/column.decorator';
import { Entity } from '../../../decorators/entity.decorator';

@Entity<PostEntity>({
  key: ['title'],
})
export class PostEntity {
  @Column({
    type: 'text',
  })
  title!: string;

  @Column({
    type: 'text',
  })
  content?: string;
}
