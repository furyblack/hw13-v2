import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PostEntity, PostModelType } from '../../domain/post.entity';
import { PostsViewDto } from '../../api/view-dto/posts.view-dto';
import { DeletionStatus } from '../../../../user-accounts/domain/user.entity';
import { GetPostsQueryParams } from '../../api/input-dto/get-posts-query-params.input-dto';
import { PaginatedViewDto } from '../../../../../core/dto/base.paginated.view-dto';
import { FilterQuery } from 'mongoose';

@Injectable()
export class PostsQueryRepository {
  constructor(
    @InjectModel(PostEntity.name)
    private postModel: PostModelType,
  ) {}
  async getByIdOrNotFoundFail(id: string): Promise<PostsViewDto> {
    const post = await this.postModel.findOne({
      _id: id,
      deletionStatus: { $ne: DeletionStatus.PermanentDeleted },
    });
    if (!post) {
      throw new NotFoundException('post not found');
    }
    return PostsViewDto.mapToView(post);
  }
  async getAll(
    query: GetPostsQueryParams,
  ): Promise<PaginatedViewDto<PostsViewDto[]>> {
    const filter: FilterQuery<PostEntity> = {
      deletionStatus: DeletionStatus.NotDeleted,
    };
    if (query.searchTitleTerm) {
      filter.$or = filter.$or || [];
      filter.$or.push({
        title: { $regex: query.searchTitleTerm, $options: 'i' },
      });
    }

    const posts = await this.postModel
      .find(filter)
      .sort({ [query.sortBy]: query.sortDirection })
      .skip(query.calculateSkip())
      .limit(query.pageSize);

    const totalCount = await this.postModel.countDocuments(filter);

    const items = posts.map(PostsViewDto.mapToView);

    return PaginatedViewDto.mapToView({
      items,
      totalCount,
      page: query.pageNumber,
      size: query.pageSize,
    });
  }
}
