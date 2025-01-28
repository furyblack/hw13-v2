import { HttpStatus, INestApplication } from '@nestjs/common';
import { CreateBlogDomainDto } from '../../src/moduls/bloggers-platform/blogs/dto/create-user.domain.dto';
import { BlogsViewDto } from '../../src/moduls/bloggers-platform/blogs/api/view-dto/blogs.view-dto';
import request from 'supertest';
import { delay } from './delay';

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
  async createSeveralBlogs(count: number): Promise<BlogsViewDto[]> {
    const blogsPromises = [] as Promise<BlogsViewDto>[];
    for (let i = 0; i < count; ++i) {
      await delay(50);
      const response = this.createBlog({
        name: 'string' + i,
        description: `string${i}`,
        websiteUrl:
          'https://p.7H1rV.DE-7hHrXZ9-ecNVheetttF66YKCJ_-gjJz1zDp0fQ6Yk1RCgUP00kPHQQ-ZuYOna0386PCmCt6VFpYShwgjX',
      });
      blogsPromises.push(response);
    }
    return Promise.all(blogsPromises);
  }
}
