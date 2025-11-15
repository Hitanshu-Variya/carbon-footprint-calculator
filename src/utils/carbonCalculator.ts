import { UserResponse, CarbonResult, CategoryResult } from '@/types/carbon';
import { activities } from '@/data/activities';

const DAYS_PER_YEAR = 365;
const WEEKS_PER_YEAR = 52;

export function calculateCarbonFootprint(responses: UserResponse[]): CarbonResult {
  const categoryTotals: Record<string, number> = {
    transport: 0,
    energy: 0,
    food: 0,
    digital: 0,
    waste: 0,
  };

  // Calculate carbon for each response
  responses.forEach(response => {
    for (const [category, activityList] of Object.entries(activities)) {
      const activity = activityList.find(a => a.id === response.activityId);
      if (activity) {
        let annualCarbon = 0;
        
        // Convert to annual emissions based on unit
        if (activity.unit === 'km' || activity.unit === 'hours' || activity.unit === 'kWh' || activity.unit === 'servings' || activity.unit === 'charges' || activity.unit === 'GB') {
          annualCarbon = activity.carbonPerUnit * response.value * DAYS_PER_YEAR;
        } else if (activity.unit === 'meals' || activity.unit === 'items') {
          annualCarbon = activity.carbonPerUnit * response.value * WEEKS_PER_YEAR;
        } else if (activity.unit === 'flights') {
          annualCarbon = activity.carbonPerUnit * response.value;
        } else if (activity.unit === '%') {
          // Percentage-based (recycling, local food) - scales the reduction
          annualCarbon = activity.carbonPerUnit * response.value * DAYS_PER_YEAR;
        }
        
        categoryTotals[category] += annualCarbon;
      }
    }
  });

  const totalCarbon = Math.max(Object.values(categoryTotals).reduce((sum, val) => sum + val, 0), 0);

  // Calculate category breakdown
  const categoryBreakdown: CategoryResult[] = Object.entries(categoryTotals).map(([category, total]) => ({
    category: category as any,
    total,
    percentage: totalCarbon > 0 ? (total / totalCarbon) * 100 : 0,
  }));

  // Determine impact level (average person: ~4000 kg CO2/year)
  let level: 'low' | 'medium' | 'high';
  if (totalCarbon < 3000) level = 'low';
  else if (totalCarbon < 6000) level = 'medium';
  else level = 'high';

  return {
    totalCarbon,
    categoryBreakdown,
    level,
  };
}

export function getCarbonLevelColor(level: 'low' | 'medium' | 'high'): string {
  const colors = {
    low: 'hsl(var(--success))',
    medium: 'hsl(var(--warning))',
    high: 'hsl(var(--danger))',
  };
  return colors[level];
}

export function getCarbonLevelGradient(level: 'low' | 'medium' | 'high'): string {
  const gradients = {
    low: 'bg-gradient-eco',
    medium: 'bg-gradient-warning',
    high: 'bg-gradient-danger',
  };
  return gradients[level];
}
