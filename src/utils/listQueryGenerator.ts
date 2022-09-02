export function listQueryGenerator(queryList: (string | number)[]) {
  return queryList
    .map((query, index) => {
      // first item doesn't need & at first
      if (index === 0) {
        return "?id=" + query;
      }
      return "&id=" + query;
    })
    .join("");
}
