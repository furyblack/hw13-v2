import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreatePostDomainDto } from '../dto/create-post.dto';
import { PostsViewDto } from './view-dto/posts.view-dto';
import { PostsService } from '../application/posts.service';
import { PostsQueryRepository } from '../infrastructure/query/posts.query-repository';
import { GetPostsQueryParams } from './input-dto/get-posts-query-params.input-dto';
import { PaginatedViewDto } from '../../../../core/dto/base.paginated.view-dto';

@Controller('posts')
export class PostsController {
  constructor(
    private postQueryRepository: PostsQueryRepository,
    private postService: PostsService,
  ) {}

  @Post()
  async createPost(@Body() body: CreatePostDomainDto): Promise<PostsViewDto> {
    const postId = await this.postService.createPost(body);
    return this.postQueryRepository.getByIdOrNotFoundFail(postId);
  }

  @Get()
  async getAll(
    @Query() query: GetPostsQueryParams,
  ): Promise<PaginatedViewDto<PostsViewDto[]>> {
    return this.postQueryRepository.getAll(query);
  }
}
