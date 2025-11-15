import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { CarbonResult } from '@/types/carbon';
import { EnvironmentalScene } from './EnvironmentalScene';
import { GamificationBadges } from './GamificationBadges';
import { Lightbulb, Leaf, Bike, Recycle, Utensils } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface LiveResultsProps {
  result: CarbonResult | null;
}

const tips = [
  { icon: <Bike className="w-5 h-5" />, text: 'Use public transport or bike more', category: 'transport' },
  { icon: <Lightbulb className="w-5 h-5" />, text: 'Switch to LED bulbs and renewable energy', category: 'energy' },
  { icon: <Utensils className="w-5 h-5" />, text: 'Try plant-based meals a few times a week', category: 'food' },
  { icon: <Recycle className="w-5 h-5" />, text: 'Recycle and compost your waste', category: 'waste' },
  { icon: <Leaf className="w-5 h-5" />, text: 'Reduce streaming quality to save energy', category: 'digital' },
];

export function LiveResults({ result }: LiveResultsProps) {
  if (!result) {
    return (
      <div className="sticky top-8 space-y-4">
        <Card className="p-8 text-center border-dashed">
          <div className="space-y-4">
            <div className="text-6xl">🌍</div>
            <h3 className="text-xl font-semibold text-foreground">Your Impact Visualizer</h3>
            <p className="text-muted-foreground">
              Start answering questions to see your real-time environmental impact!
            </p>
          </div>
        </Card>
      </div>
    );
  }

  const { totalCarbon, level, categoryBreakdown } = result;
  const treesNeeded = Math.ceil(totalCarbon / 21);
  const averageCarbon = 4000;
  const comparisonPercent = ((totalCarbon / averageCarbon) * 100).toFixed(0);

  return (
    <div className="sticky top-8 space-y-4">
      {/* Environmental Scene */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <EnvironmentalScene carbonLevel={level} totalCarbon={totalCarbon} />
      </motion.div>

      {/* Total Carbon Display */}
      <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-2 border-primary/20">
        <div className="text-center space-y-2">
          <div className="text-sm font-medium text-muted-foreground">Your Annual Carbon Footprint</div>
          <motion.div
            key={totalCarbon}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl font-bold text-primary"
          >
            {totalCarbon.toLocaleString()}
          </motion.div>
          <div className="text-sm text-muted-foreground">kg CO₂ per year</div>
        </div>
      </Card>

      {/* Gamification Badges */}
      <Card className="p-4">
        <GamificationBadges carbonLevel={level} totalCarbon={totalCarbon} />
      </Card>

      {/* Comparison to Average */}
      <Card className="p-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">vs Global Average</span>
          <span className="font-semibold">{comparisonPercent}%</span>
        </div>
        <Progress value={Math.min(parseFloat(comparisonPercent), 100)} className="h-2" />
        <div className="text-xs text-muted-foreground text-center">
          {parseFloat(comparisonPercent) < 75 ? '✨ Below average!' : 
           parseFloat(comparisonPercent) < 125 ? '📊 Near average' : 
           '⚠️ Above average'}
        </div>
      </Card>

      {/* Trees Needed */}
      <Card className="p-4 bg-green-500/10 dark:bg-green-500/5 border-green-500/20">
        <div className="flex items-center gap-3">
          <div className="text-4xl">🌳</div>
          <div>
            <div className="font-semibold text-green-700 dark:text-green-400">
              {treesNeeded} trees needed
            </div>
            <div className="text-xs text-muted-foreground">
              to offset your annual emissions
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Tips */}
      <Card className="p-4 space-y-3">
        <h4 className="font-semibold text-sm flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-yellow-500" />
          Ways to Improve
        </h4>
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {tips.slice(0, 3).map((tip, index) => (
              <motion.div
                key={tip.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2 text-sm"
              >
                <div className="text-primary mt-0.5">{tip.icon}</div>
                <span className="text-muted-foreground">{tip.text}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
}
