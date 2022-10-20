export function baseUrl(): string {
  const base_url: string | undefined = process.env.VITE_BASE_URL;
  return base_url || "";
}
