import { Activity } from '@/types/carbon';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';

interface QuestionCardProps {
  activity: Activity;
  value: number;
  onChange: (value: number) => void;
}

export function QuestionCard({ activity, value, onChange }: QuestionCardProps) {
  const [localValue, setLocalValue] = useState(value);
  
  const maxValue = activity.unit === '%' ? 100 : 
                   activity.unit === 'flights' ? 10 :
                   activity.unit === 'GB' ? 100 :
                   activity.unit === 'items' ? 30 : 50;

  const handleChange = (newValues: number[]) => {
    const newValue = newValues[0];
    setLocalValue(newValue);
    onChange(newValue);
  };

  return (
    <Card className="p-6 space-y-4 bg-card hover:shadow-glow transition-all duration-300 border-border animate-scale-in">
      <div className="flex items-center gap-3">
        <div className="text-4xl">{activity.icon}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-card-foreground">{activity.name}</h3>
          <p className="text-sm text-muted-foreground">
            {activity.carbonPerUnit > 0 ? 'Impacts emissions' : 'Reduces emissions'}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{localValue}</div>
          <div className="text-xs text-muted-foreground">{activity.unit}</div>
        </div>
      </div>
      
      <Slider
        value={[localValue]}
        onValueChange={handleChange}
        max={maxValue}
        step={activity.unit === '%' ? 5 : 1}
        className="w-full"
      />
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>0 {activity.unit}</span>
        <span>{maxValue} {activity.unit}</span>
      </div>
    </Card>
  );
}
