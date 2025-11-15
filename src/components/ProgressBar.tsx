import { ActivityCategory } from '@/types/carbon';
import { categoryNames } from '@/data/activities';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentCategory: ActivityCategory;
  completedCategories: ActivityCategory[];
}

const categories: ActivityCategory[] = ['transport', 'energy', 'food', 'digital', 'waste'];

export function ProgressBar({ currentCategory, completedCategories }: ProgressBarProps) {
  const currentIndex = categories.indexOf(currentCategory);
  
  return (
    <div className="w-full py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          {categories.map((category, index) => {
            const isCompleted = completedCategories.includes(category);
            const isCurrent = category === currentCategory;
            const isPast = index < currentIndex;
            
            return (
              <div key={category} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                    transition-all duration-300
                    ${isCurrent ? 'bg-primary text-primary-foreground shadow-glow animate-pulse-glow' : ''}
                    ${isCompleted || isPast ? 'bg-success text-white' : ''}
                    ${!isCurrent && !isCompleted && !isPast ? 'bg-muted text-muted-foreground' : ''}
                  `}>
                    {isCompleted || isPast ? <Check className="w-5 h-5" /> : index + 1}
                  </div>
                  <span className={`
                    text-xs font-medium hidden sm:block
                    ${isCurrent ? 'text-primary' : ''}
                    ${isCompleted || isPast ? 'text-success' : ''}
                    ${!isCurrent && !isCompleted && !isPast ? 'text-muted-foreground' : ''}
                  `}>
                    {categoryNames[category]}
                  </span>
                </div>
                
                {index < categories.length - 1 && (
                  <div className={`
                    h-1 flex-1 mx-2 rounded-full transition-all duration-300
                    ${isPast || isCompleted ? 'bg-success' : 'bg-muted'}
                  `} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
