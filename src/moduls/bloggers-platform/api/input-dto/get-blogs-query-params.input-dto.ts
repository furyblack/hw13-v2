import { BaseSortablePaginationParams } from '../../../../core/dto/base.query-params.input-dto';
import { BlogsSortBy } from './blogs-sort-by';

export class GetBlogsQueryParams extends BaseSortablePaginationParams<BlogsSortBy> {
  sortBy = BlogsSortBy.CreatedAt;
  searchLoginTerm: string | null = null;
  searchEmailTerm: string | null = null;
}
