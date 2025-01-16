import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './domain/blog.entity';
import { BlogsController } from './api/blogs.controller';
import { BlogsQueryRepository } from './infrastructure/query/blogs.query-repository';
import { BlogsService } from './application/blogs.service';
import { BlogsRepository } from './infrastructure/blogs-repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  controllers: [BlogsController],
  providers: [BlogsService, BlogsQueryRepository, BlogsRepository],
  exports: [MongooseModule],
})
export class BloggerPlatformModule {}
