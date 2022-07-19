interface SearchInterface {
  q: string;
  data: any[];
}

export function search(args: SearchInterface) {
  // filter the search results with a for loop
  const { q, data } = args;
  const results = [];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    // Make the item lowercase and stringify it
    // then check if the search query is in the item
    if (Object.values(item).join("-").toLowerCase().includes(q.toLowerCase())) {
      results.push(item);
    }
  }
  return results;
}
