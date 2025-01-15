import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogModelType } from '../domain/blog.entity';
import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { BlogsRepository } from '../infrastructure/blogs-repository';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name)
    private blogModel: BlogModelType,
    private blogsRepository: BlogsRepository,
  ) {}

  async createBlog(dto: CreateBlogDto): Promise<string> {
    const blog = this.blogModel.createInstance({
      name: dto.name,
      description: dto.description,
      websiteUrl: dto.websiteUrl,
    });
    await this.blogsRepository.save(blog);
    return blog._id.toString();
  }
}
