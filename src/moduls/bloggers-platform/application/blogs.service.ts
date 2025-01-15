import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogModelType } from '../domain/blog.entity';
import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from '../dto/create-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name)
    private blogModel: BlogModelType,
  ) {}

  async createBlog(dto: CreateBlogDto): Promise<string> {
    const blog = Blog.createInstance(dto);
    await this.blogModel.create(blog);
    return blog._id.toString();
  }
}
