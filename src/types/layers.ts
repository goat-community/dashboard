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
