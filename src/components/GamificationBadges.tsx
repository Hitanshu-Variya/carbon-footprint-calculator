import { motion, AnimatePresence } from 'framer-motion';
import { Award, Leaf, Zap, Recycle, Heart, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface GamificationBadgesProps {
  carbonLevel: 'low' | 'medium' | 'high';
  totalCarbon: number;
}

interface Achievement {
  id: string;
  title: string;
  icon: React.ReactNode;
  condition: (level: string, carbon: number) => boolean;
  description: string;
}

const achievements: Achievement[] = [
  {
    id: 'eco-warrior',
    title: 'Eco Warrior',
    icon: <Trophy className="w-5 h-5" />,
    condition: (level) => level === 'low',
    description: 'Low carbon footprint!',
  },
  {
    id: 'green-champion',
    title: 'Green Champion',
    icon: <Leaf className="w-5 h-5" />,
    condition: (level, carbon) => level === 'low' && carbon < 2000,
    description: 'Under 2000 kg CO₂/year!',
  },
  {
    id: 'energy-saver',
    title: 'Energy Saver',
    icon: <Zap className="w-5 h-5" />,
    condition: (level) => level === 'medium',
    description: 'Getting better!',
  },
  {
    id: 'recycler',
    title: 'Recycler',
    icon: <Recycle className="w-5 h-5" />,
    condition: (level) => level !== 'high',
    description: 'Good habits!',
  },
  {
    id: 'planet-lover',
    title: 'Planet Lover',
    icon: <Heart className="w-5 h-5" />,
    condition: () => true,
    description: 'Every step counts!',
  },
];

export function GamificationBadges({ carbonLevel, totalCarbon }: GamificationBadgesProps) {
  const earnedAchievements = achievements.filter(achievement => 
    achievement.condition(carbonLevel, totalCarbon)
  );

  const getScoreColor = () => {
    if (carbonLevel === 'low') return 'text-success';
    if (carbonLevel === 'medium') return 'text-warning';
    return 'text-danger';
  };

  const getScoreLabel = () => {
    if (carbonLevel === 'low') return 'Excellent!';
    if (carbonLevel === 'medium') return 'Good Start!';
    return 'Room to Improve!';
  };

  return (
    <div className="space-y-4">
      {/* Score Display */}
      <motion.div 
        className="text-center space-y-2"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center gap-2">
          <Award className={`w-8 h-8 ${getScoreColor()}`} />
          <span className={`text-2xl font-bold ${getScoreColor()}`}>
            {getScoreLabel()}
          </span>
        </div>
      </motion.div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 justify-center">
        <AnimatePresence mode="popLayout">
          {earnedAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: index * 0.1,
              }}
            >
              <Badge 
                variant="secondary" 
                className="px-3 py-2 gap-2 hover:scale-105 transition-transform cursor-pointer bg-primary/10 text-primary border-primary/20"
              >
                {achievement.icon}
                <div className="text-left">
                  <div className="font-semibold text-xs">{achievement.title}</div>
                  <div className="text-[10px] text-muted-foreground">{achievement.description}</div>
                </div>
              </Badge>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Progress Message */}
      <motion.div
        className="text-center text-sm text-muted-foreground"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {carbonLevel === 'low' && '🌟 Amazing! You\'re a climate hero!'}
        {carbonLevel === 'medium' && '💪 Keep it up! Small changes make big impacts!'}
        {carbonLevel === 'high' && '🌱 Let\'s work together to reduce your footprint!'}
      </motion.div>
    </div>
  );
}
