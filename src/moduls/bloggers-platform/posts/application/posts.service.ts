import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PostEntity, PostModelType } from '../domain/post.entity';
import {
  CreatePostDomainDto,
  CreatePostDto,
  UpdatePostDto,
} from '../dto/create-post.dto';
import { PostsRepository } from '../infrastructure/posts-repository';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostEntity.name)
    private postModel: PostModelType,
    private postRepository: PostsRepository,
  ) {}

  async createPost(dto: CreatePostDto): Promise<string> {
    const post = this.postModel.createInstance({
      title: dto.title,
      shortDescription: dto.shortDescription,
      content: dto.content,
      blogId: dto.blogId,
    });
    await this.postRepository.save(post);
    return post._id.toString();
  }

  async createPostForBlog(
    blogId: string,
    dto: CreatePostDomainDto,
  ): Promise<string> {
    const post = this.postModel.createInstance({
      title: dto.title,
      shortDescription: dto.shortDescription,
      content: dto.content,
      blogId: blogId,
    });
    await this.postRepository.save(post);
    return post._id.toString();
  }

  async deletePost(id: string) {
    const post = await this.postRepository.findOrNotFoundFail(id);
    post.makeDeleted();
    await this.postRepository.save(post);
  }
  async updatePost(id: string, dto: UpdatePostDto): Promise<string> {
    const post = await this.postRepository.findOrNotFoundFail(id);
    post.update(dto);
    await this.postRepository.save(post);
    return post._id.toString();
  }
}
