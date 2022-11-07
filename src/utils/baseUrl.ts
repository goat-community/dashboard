export function baseUrl(args: { removeV1?: boolean }): string {
  let base_url: string | undefined = process.env.VITE_BASE_URL;
  if (args?.removeV1) {
    if (process.env.VITE_BASE_URL === "/api") {
      // the dev doesn't return the complete url
      // and proxy it, so we should return the hardcoded
      return (base_url = "https://goat-dev.plan4better.de/api");
    }
    // It's not dev
    // so the complete URL is provided
    // with remove of V1 prefix we return it
    base_url = base_url?.replace("/v1", "");
  }
  return base_url || "";
}
