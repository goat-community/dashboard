export interface GeoStore {
  configuration: {
    url?: string;
    name?: string;
    description?: string;
    type?: string;
    legend?: string;
    attribution?: string;
    getcapabilities?: string;
  };
  id?: number;
  name: string;
  type: "geoadmin" | "other";
  url: string;
  attribution: string;
  thumbnail_url: string;
}
