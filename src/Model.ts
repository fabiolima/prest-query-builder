import axios from 'axios';

import { BaseModel, JoinQuery, ModelConfig, PageOptions, Pagination, WhereQuery } from "./interfaces";
import { _pageOptions, _pagination } from "./defaults";

export default class Model<T> extends BaseModel {
  private config: ModelConfig;
  private pipeline: string[] = [];

  private paginate = false;
  private _pagination: Pagination = {} as Pagination

  constructor(config: ModelConfig) {
    super(axios)
    this.config = config;
  }

  baseUrl(): string {
    return this.config.url || `${this.config.https ? 'https://' : 'http://'}${this.config.domain}/${this.config.db}/public/${this.config.table}`
  }

  where(wQuery: WhereQuery): this {
    const q = `${wQuery.field}=${wQuery.operator}.${wQuery.value}`
    this.pipeline.push(q);
    return this
  }

  select(fields: string[]): this {
    const q = `_select=${fields.join(',')}`
    this.pipeline.push(q)
    return this
  }

  join(jQuery: JoinQuery): this {
    const q = `_join=${jQuery.type}:${jQuery.tableJoin}:${jQuery.tableJoin}.${jQuery.tableJoinKey}:${jQuery.operator}:${jQuery.table}.${jQuery.tableKey}`
    this.pipeline.push(q)
    return this
  }

  count(field = '*'): Promise<number> {
    this.pipeline.push(`_count=${field}`);

    const queryString = '?' + this.pipeline.join('&')

    const endpoint = `${this.baseUrl()}${queryString}`

    return this.client
      .get<{ count: number }>(endpoint)
      .then(response => response.data.count)
      .then((count: number) => {
        this.paginate = false;
        this.pipeline = [];

        return count
      })
  }

  pagination(paginationOptions: PageOptions = _pageOptions): this {
    const q = `_page=${paginationOptions.page}&_page_size=${paginationOptions.pageSize}`;

    this._pagination = { ..._pagination, ...paginationOptions, _q: q };
    this.paginate = true;
    this.pipeline.push(q);

    return this
  }

  private buildPagination({ total, pageSize, page }: { total: number, pageSize: number, page: number }): Pagination {
    let totalPages = 0;
    let nextPage = 0;
    let prevPage = 0;
    let isLast = false;
    let isFirst = false;

    if (total === 0) totalPages = 0;
    if (total > 0 && total <= pageSize) totalPages = 1;
    if (total > 0) totalPages = Math.ceil(total/this._pagination.pageSize)

    nextPage = page + 1;
    prevPage = page > 1 ? page - 1 : 1;
    isLast = page === totalPages
    isFirst = page === 1

    return {
      page,
      pageSize,
      total,
      totalPages,
      nextPage,
      prevPage,
      isLast,
      isFirst
    }
  }

  run(): Promise< T[] | { pagination: PageOptions, items: T[]} > {
    const queryString = '?' + this.pipeline.join('&')

    const endpoint = `${this.baseUrl()}${queryString}`

    return this.client
      .get<T[]>(endpoint)
      .then( async (response) => {
        if (!this.paginate) return response.data

        console.log(this._pagination)
        const totalEndpoint = endpoint.replace(this._pagination._q as string, '')

        const total = await this.client
          .get<{ count: number}>(totalEndpoint + '&_count=*')
          .then(r => r.data.count)
          .catch(() => 0 )

        const pagination = this.buildPagination({
          total,
          pageSize: this._pagination.pageSize,
          page: this._pagination.page
        })

        return {
          pagination,
          items: response.data
        }
      })
      .then((response) => {
        this.paginate = false;
        this.pipeline = [];

        return response
      })
  }
}
