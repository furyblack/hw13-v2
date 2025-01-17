import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PostEntity, PostModelType } from '../domain/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
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
}
