import { Body, Controller, Post } from '@nestjs/common';
import { CreateBlogDomainDto } from '../dto/create-user.domain.dto';
import { BlogsViewDto } from './view-dto/blogs.view-dto';
import { BlogsQueryRepository } from '../infrastructure/query/blogs.query-repository';
import { BlogsService } from '../application/blogs.service';

@Controller('blogs')
export class BlogsController {
  constructor(
    private blogQueryRepository: BlogsQueryRepository,
    private blogService: BlogsService,
  ) {}
  @Post()
  async createBlog(@Body() body: CreateBlogDomainDto): Promise<BlogsViewDto> {
    const blogId = await this.blogService.createBlog(body);
    return this.blogQueryRepository.getByIdOrNotFoundFail(blogId);
  }
}
