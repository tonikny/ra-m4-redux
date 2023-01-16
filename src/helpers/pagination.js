export const paginatedIds = (all, itemsPerPage, currentPage) =>
  all.slice(0, itemsPerPage * currentPage)

export const isLastPage = (all, itemsPerPage, currentPage) =>
  !(all.length > itemsPerPage * currentPage)
