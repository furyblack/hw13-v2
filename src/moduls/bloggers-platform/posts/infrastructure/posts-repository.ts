import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PostEntity, PostDocument, PostModelType } from '../domain/post.entity';
import { DeletionStatus } from '../../../user-accounts/domain/user.entity';

@Injectable()
export class PostsRepository {
  constructor(@InjectModel(PostEntity.name) private postModel: PostModelType) {}
  async save(post: PostDocument) {
    await post.save();
  }
  async findByid(id: string): Promise<PostDocument | null> {
    return this.postModel.findOne({
      _id: id,
      deletionStatus: { $ne: DeletionStatus.PermanentDeleted },
    });
  }
  async findOrNotFoundFail(id: string): Promise<PostDocument> {
    const post = await this.findByid(id);
    if (!post) {
      throw new NotFoundException('post not found');
    }
    return post;
  }
}
