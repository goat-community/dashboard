interface PaginationInterface {
  page: number;
  perPage: number;
  data: any[];
}

export function pagination(args: PaginationInterface) {
  const { page, perPage, data } = args;
  const start = (page - 1) * perPage;
  const end = page * perPage;
  return data.slice(start, end);
}
