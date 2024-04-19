export function createPagination(
  page: number,
  pageSize: number,
  totalCount: number
) {
  const offset = (page - 1) * pageSize;

  const hasNextPage = page * pageSize < totalCount;
  const hasPreviousPage = page > 1;

  let nextPage = null;
  if (hasNextPage) {
    nextPage = page + 1;
  }

  let previousPage = null;
  if (hasPreviousPage) {
    previousPage = page - 1;
  }

  return {
    offset,
    limit: pageSize,
  };
}
