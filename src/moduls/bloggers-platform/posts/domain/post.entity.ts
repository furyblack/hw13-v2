import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DeletionStatus } from '../../../user-accounts/domain/user.entity';
import { CreatePostDomainDto } from '../dto/create-post.dto';
import { HydratedDocument, Model } from 'mongoose';

@Schema({ timestamps: true })
export class PostEntity {
  @Prop()
  title: string;
  @Prop()
  content: string;
  @Prop()
  blogId: string;
  @Prop()
  shortDescription: string;
  createdAt: Date;
  @Prop()
  likesCount: number;
  @Prop({ enum: DeletionStatus, default: DeletionStatus.NotDeleted })
  deletionStatus: DeletionStatus;

  static createInstance(dto: CreatePostDomainDto): PostDocument {
    const post = new this();
    post.title = dto.title;
    post.content = dto.content;
    post.blogId = dto.blogId;
    post.shortDescription = dto.shortDescription;
    post.createdAt = new Date();
    post.likesCount = 0;
    post.deletionStatus = DeletionStatus.NotDeleted;
    return post as PostDocument;
  }

  makeDeleted() {
    if (this.deletionStatus !== DeletionStatus.NotDeleted) {
      throw new Error('Entity already deleted');
    }
    this.deletionStatus = DeletionStatus.PermanentDeleted;
  }
  update(dto: CreatePostDomainDto) {
    this.title = dto.title;
    this.content = dto.content;
    this.shortDescription = dto.shortDescription;
  }
}

export const PostSchema = SchemaFactory.createForClass(PostEntity);

PostSchema.loadClass(PostEntity);

export type PostDocument = HydratedDocument<PostEntity>;

export type PostModelType = Model<PostDocument> & typeof PostEntity;
