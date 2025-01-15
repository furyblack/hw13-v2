import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogModelType } from '../../domain/blog.entity';
import { BlogsViewDto } from '../../api/view-dto/blogs.view-dto';

@Injectable()
export class BlogsQueryRepository {
  constructor(
    @InjectModel(Blog.name)
    private blogModel: BlogModelType,
  ) {}
  async getByIdOrNotFoundFail(id: string): Promise<BlogsViewDto> {
    const blog = await this.blogModel.findOne({
      _id: id,
      // deletionStatus: { $ne: DeletionStatus.PermanentDeleted },
    });
    if (!blog) {
      throw new Error('blog not found');
    }
    return BlogsViewDto.mapToView(blog);
  }
}
