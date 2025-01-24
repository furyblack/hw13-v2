import { HttpStatus, INestApplication } from '@nestjs/common';
import { CreateBlogDomainDto } from '../../src/moduls/bloggers-platform/blogs/dto/create-user.domain.dto';
import { BlogsViewDto } from '../../src/moduls/bloggers-platform/blogs/api/view-dto/blogs.view-dto';
import request from 'supertest';

export class BlogsTestManager {
  constructor(private app: INestApplication) {}
  async createBlog(
    createModel: CreateBlogDomainDto,
    statusCode: number = HttpStatus.CREATED,
  ): Promise<BlogsViewDto> {
    const response = await request(this.app.getHttpServer())
      .post('/api/blogs')
      .send(createModel)
      .expect(statusCode);
    return response.body;
  }
}
