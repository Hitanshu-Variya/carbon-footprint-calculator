import { useState, useEffect } from 'react';
import { Hero } from '@/components/Hero';
import { CategorySection } from '@/components/CategorySection';
import { ProgressBar } from '@/components/ProgressBar';
import { Results } from '@/components/Results';
import { LiveResults } from '@/components/LiveResults';
import { Button } from '@/components/ui/button';
import { activities } from '@/data/activities';
import { ActivityCategory, UserResponse, CarbonResult } from '@/types/carbon';
import { calculateCarbonFootprint } from '@/utils/carbonCalculator';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const categories: ActivityCategory[] = ['transport', 'energy', 'food', 'digital', 'waste'];

const Index = () => {
  const [stage, setStage] = useState<'hero' | 'questionnaire' | 'results'>('hero');
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [result, setResult] = useState<CarbonResult | null>(null);

  // Calculate results in real-time as user responds
  useEffect(() => {
    if (stage === 'questionnaire' && Object.keys(responses).length > 0) {
      const userResponses: UserResponse[] = Object.entries(responses).map(([activityId, value]) => ({
        activityId,
        value,
      }));
      const calculatedResult = calculateCarbonFootprint(userResponses);
      setResult(calculatedResult);
    }
  }, [responses, stage]);

  const currentCategory = categories[currentCategoryIndex];
  const completedCategories = categories.slice(0, currentCategoryIndex);

  const handleStart = () => {
    setStage('questionnaire');
    setCurrentCategoryIndex(0);
    setResponses({});
  };

  const handleResponseChange = (activityId: string, value: number) => {
    setResponses(prev => ({ ...prev, [activityId]: value }));
  };

  const handleNext = () => {
    if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex(prev => prev + 1);
    } else {
      setStage('results');
    }
  };

  const handleBack = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setStage('hero');
    setCurrentCategoryIndex(0);
    setResponses({});
    setResult(null);
  };

  if (stage === 'hero') {
    return <Hero onStart={handleStart} />;
  }

  if (stage === 'results' && result) {
    return <Results result={result} onRestart={handleRestart} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <ProgressBar currentCategory={currentCategory} completedCategories={completedCategories} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left side - Questions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <CategorySection
              category={currentCategory}
              activities={activities[currentCategory]}
              responses={responses}
              onResponseChange={handleResponseChange}
            />

            <div className="flex justify-between gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={handleBack}
                disabled={currentCategoryIndex === 0}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Button>

              <Button
                size="lg"
                onClick={handleNext}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {currentCategoryIndex === categories.length - 1 ? 'See Full Results' : 'Next Category'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>

          {/* Right side - Live Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <LiveResults result={result} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;
