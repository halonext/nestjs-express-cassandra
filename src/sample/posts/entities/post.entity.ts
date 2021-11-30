import {
  Column,
  CreateDateColumn,
  TimeUUIDColumn,
  UpdateDateColumn,
  UUIDColumn,
  VersionColumn,
} from '../../../decorators/column.decorator';
import { Entity } from '../../../decorators/entity.decorator';

@Entity<PostEntity>({
  key: ['postId'],
})
export class PostEntity {
  @Column({
    type: 'int',
  })
  postId!: number;

  @UUIDColumn()
  userId?: string;

  @TimeUUIDColumn()
  dateID?: string;

  @VersionColumn()
  version?: string;

  @Column({
    type: 'text',
    rule: { required: true },
  })
  title!: string;

  @Column({
    type: 'text',
  })
  content?: string;

  @CreateDateColumn()
  createdAt?: string;

  @UpdateDateColumn()
  updatedAt?: string;
}
