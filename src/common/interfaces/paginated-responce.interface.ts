export interface PaginationMetaFormat {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PaginatedResponce<T> {
  items: T[];
  meta: PaginationMetaFormat;
}
