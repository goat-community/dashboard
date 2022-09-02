export function listQueryGenerator(
  queryList: (string | number)[],
  queryKey = "id"
): string {
  return queryList
    .map((query, index) => {
      // first item doesn't need & at first
      if (index === 0) {
        return `?${queryKey}=` + query;
      }
      return `&${queryKey}=` + query;
    })
    .join("");
}
