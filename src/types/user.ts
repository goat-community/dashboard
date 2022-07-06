export interface User {
  name: string;
  surname: string;
  email: string;
  organization_id: number;
  active_study_area_id: string;
  active_data_upload_ids: string;
  storage: number;
  limit_scenarios: number;
  id?: number;
  hashed_password?: string;
  is_active?: boolean;
  default?: false;
  newsletter?: boolean;
  occupation?: string;
  domain?: string;
  creation_date?: string;
  language_preference: string;
}
