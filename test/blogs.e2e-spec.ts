import { initSettings } from './helpers/init-settings';
import { JwtService } from '@nestjs/jwt';
import { deleteAllData } from './helpers/delete-all-data';
import { BlogsTestManager } from './helpers/blogs-test-manager';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { CreateBlogDto } from '../src/moduls/bloggers-platform/blogs/dto/create-blog.dto';
import request from 'supertest';
import { PaginatedViewDto } from '../src/core/dto/base.paginated.view-dto';
import { BlogsViewDto } from '../src/moduls/bloggers-platform/blogs/api/view-dto/blogs.view-dto';

describe('blogs', () => {
  let app: INestApplication;
  let blogTestManager: BlogsTestManager;
  beforeAll(async () => {
    const result = await initSettings((moduleBuilder) => {
      moduleBuilder.overrideProvider(JwtService).useValue(
        new JwtService({
          secret: 'access-token-secret',
          signOptions: { expiresIn: '2s' },
        }),
      );
    });
    app = result.app;
    blogTestManager = result.blogTestManager;
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await deleteAllData(app);
  });
  it('should create new blog', async () => {
    const body: CreateBlogDto = {
      name: 'string',
      description: 'string',
      websiteUrl:
        'https://p.7H1rV.DE-7hHrXZ9-ecNVheetttF66YKCJ_-gjJz1zDp0fQ6Yk1RCgUP00kPHQQ-ZuYOna0386PCmCt6VFpYShwgjX',
    };
    const response = await blogTestManager.createBlog(body);
    expect(response).toEqual({
      name: body.name,
      id: expect.any(String),
      description: body.description,
      websiteUrl: body.websiteUrl,
      createdAt: expect.any(String),
      isMembership: expect.any(Boolean),
    });
  });
  it('should get blogs with paging ', async () => {
    const blogs = await blogTestManager.createSeveralBlogs(12);
    const { body: responseBody } = (await request(app.getHttpServer())
      .get(`/api/blogs?pageNumber=2&sortDirection=asc`)
      .expect(HttpStatus.OK)) as { body: PaginatedViewDto<BlogsViewDto> };

    expect(responseBody.totalCount).toBe(12);
    expect(responseBody.items).toHaveLength(2);
    expect(responseBody.pagesCount).toBe(2);
    expect(responseBody.items[1]).toEqual(blogs[blogs.length - 1]);
  });
});
