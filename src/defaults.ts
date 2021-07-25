import { PageOptions, Pagination } from "./interfaces"

export const _pageOptions: PageOptions = {
  page: 1,
  pageSize: 10
}

export const _pagination: Pagination = {
  ..._pageOptions,
  total: 0,
  totalPages: 0,
  nextPage: 0,
  prevPage: 0,
  isLast: false,
  isFirst: false,
  _q: 'string',
}

