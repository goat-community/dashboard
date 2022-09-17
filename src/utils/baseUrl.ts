export function baseUrl(): string {
  const base_url: string = import.meta.env.VITE_BASE_URL;
  return base_url;
}
