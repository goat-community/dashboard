export interface Layer {
  name: string;
  url: string;
  legend_urls: string[];
  special_attribute: {};
  access_token: string;
  type: string;
  map_attribution: string;
  date: string;
  source: string;
  date_1: string;
  source_1: string;
  style_library_name: string;
  max_resolution: string;
  min_resolution: string;
  id?: number | string;
}

export interface LayerStyle {
  id?: number | string;
  name: string;
  style: object;
  translation: object;
}

export interface ExtraLayer {
  id: number | string;
  creation_date: string;
  user_id: number;
  table_name: string;
}

export interface LayerTile {
  tiles: [string];
  tilejson?: number;
  name?: string;
  description?: string;
  version?: number;
  attribution?: string;
  template?: string;
  legend?: string;
  scheme?: string;
  grids?: [string];
  data?: [string];
  minzoom?: number;
  maxzoom?: number;
  bounds?: [number, number, number, number];
  center?: [string, string, string];
}

export interface StaticVectorLayer {
  type: string;
  features: [
    {
      type: string;
      geometry: {
        type: string;
        coordinates: any[];
      };
      properties: {
        population: number;
        name: string;
        id: number;
        setting: {
          layer_groups: any[];
        };
        buffer_geom_heatmap: {
          type: string;
          coordinates: any[];
        };
      };
    }
  ];
}
