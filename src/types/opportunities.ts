export interface Opportunity {
  id: number;
  sensitivity: unknown;
  multiple_entrance: boolean;
  opportunity_group_id: number;
  category: string;
  icon: string;
  color: string[];
  study_area_id: number;
  is_active: boolean;
}

export interface OpportunityGroup {
  id: number;
  type: string;
  group: string;
  icon: string;
  color: string[];
}
