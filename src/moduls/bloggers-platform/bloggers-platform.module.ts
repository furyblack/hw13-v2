import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './blogs/domain/blog.entity';
import { BlogsQueryRepository } from './blogs/infrastructure/query/blogs.query-repository';
import { BlogsService } from './blogs/application/blogs.service';
import { BlogsRepository } from './blogs/infrastructure/blogs-repository';
import { BlogsController } from './blogs/api/blogs.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  controllers: [BlogsController],
  providers: [BlogsService, BlogsQueryRepository, BlogsRepository],
  exports: [MongooseModule],
})
export class BloggerPlatformModule {}
