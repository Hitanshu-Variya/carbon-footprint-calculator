export type ActivityCategory = 'transport' | 'energy' | 'food' | 'digital' | 'waste';

export interface Activity {
  id: string;
  name: string;
  icon: string;
  carbonPerUnit: number; // kg CO2 per unit
  unit: string;
}

export interface UserResponse {
  activityId: string;
  value: number;
}

export interface CategoryResult {
  category: ActivityCategory;
  total: number;
  percentage: number;
}

export interface CarbonResult {
  totalCarbon: number;
  categoryBreakdown: CategoryResult[];
  level: 'low' | 'medium' | 'high';
}
