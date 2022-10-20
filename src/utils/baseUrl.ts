export function baseUrl(): string {
  const base_url: string | undefined = process.env.APP_BASE_URL;
  return base_url || "";
}
