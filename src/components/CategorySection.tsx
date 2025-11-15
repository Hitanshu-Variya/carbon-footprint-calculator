import { Activity, ActivityCategory } from '@/types/carbon';
import { QuestionCard } from './QuestionCard';
import { categoryNames, categoryDescriptions } from '@/data/activities';

interface CategorySectionProps {
  category: ActivityCategory;
  activities: Activity[];
  responses: Record<string, number>;
  onResponseChange: (activityId: string, value: number) => void;
}

export function CategorySection({ 
  category, 
  activities, 
  responses, 
  onResponseChange 
}: CategorySectionProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">{categoryNames[category]}</h2>
        <p className="text-muted-foreground">{categoryDescriptions[category]}</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {activities.map(activity => (
          <QuestionCard
            key={activity.id}
            activity={activity}
            value={responses[activity.id] || 0}
            onChange={(value) => onResponseChange(activity.id, value)}
          />
        ))}
      </div>
    </div>
  );
}
