import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Cloud, Sparkles, TreeDeciduous, Factory, Wind } from 'lucide-react';
import { useEffect, useState } from 'react';

interface EnvironmentalSceneProps {
  carbonLevel: 'low' | 'medium' | 'high';
  totalCarbon: number;
}

export function EnvironmentalScene({ carbonLevel, totalCarbon }: EnvironmentalSceneProps) {
  const [trees, setTrees] = useState<number[]>([]);
  
  useEffect(() => {
    // Calculate tree count based on carbon level
    const treeCount = carbonLevel === 'low' ? 8 : carbonLevel === 'medium' ? 5 : 3;
    setTrees(Array.from({ length: treeCount }, (_, i) => i));
  }, [carbonLevel]);

  const getTreeOpacity = (index: number) => {
    if (carbonLevel === 'low') return 1;
    if (carbonLevel === 'medium') return index < 3 ? 1 : 0.3;
    return index < 2 ? 0.5 : 0.2;
  };

  const getPollutionLevel = () => {
    if (carbonLevel === 'low') return 0;
    if (carbonLevel === 'medium') return 2;
    return 4;
  };

  return (
    <div className="relative h-[300px] overflow-hidden rounded-xl bg-gradient-to-b from-sky-200 via-sky-100 to-green-100 dark:from-sky-900 dark:via-sky-800 dark:to-green-900">
      {/* Sky background with pollution overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-gray-500/20 to-gray-600/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: carbonLevel === 'high' ? 0.6 : carbonLevel === 'medium' ? 0.3 : 0 }}
        transition={{ duration: 1 }}
      />

      {/* Clouds */}
      <div className="absolute top-4 left-0 right-0 flex justify-around">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="text-white/60"
            animate={{
              x: [0, 20, 0],
              opacity: carbonLevel === 'high' ? 0.3 : 0.8,
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Cloud className="w-12 h-12" />
          </motion.div>
        ))}
      </div>

      {/* Pollution clouds */}
      <AnimatePresence>
        {[...Array(getPollutionLevel())].map((_, i) => (
          <motion.div
            key={`pollution-${i}`}
            className="absolute text-gray-600/40"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              x: 50 + i * 80,
              y: 20 + i * 30,
              scale: [1, 1.2, 1],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <Wind className="w-8 h-8" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Factory for high pollution */}
      <AnimatePresence>
        {carbonLevel === 'high' && (
          <motion.div
            className="absolute right-8 bottom-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Factory className="w-16 h-16 text-gray-700 dark:text-gray-500" />
            <motion.div
              className="absolute -top-4 left-1/2 -translate-x-1/2"
              animate={{ y: [-10, -30], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Cloud className="w-6 h-6 text-gray-500" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-green-600 to-green-400 dark:from-green-900 dark:to-green-700">
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-amber-800 to-amber-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: carbonLevel === 'high' ? 0.7 : carbonLevel === 'medium' ? 0.3 : 0 }}
          transition={{ duration: 1 }}
        />
      </div>

      {/* Trees */}
      <div className="absolute bottom-24 left-0 right-0 flex justify-around px-8">
        <AnimatePresence mode="sync">
          {trees.map((_, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ 
                opacity: getTreeOpacity(index), 
                scale: 1, 
                y: 0,
                rotate: carbonLevel === 'high' ? [0, -2, 2, 0] : 0,
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                rotate: { duration: 2, repeat: Infinity },
              }}
            >
              <TreeDeciduous 
                className="w-12 h-12 transition-colors duration-1000" 
                style={{
                  color: carbonLevel === 'low' ? 'hsl(142, 70%, 45%)' :
                         carbonLevel === 'medium' ? 'hsl(142, 50%, 35%)' :
                         'hsl(30, 40%, 30%)'
                }}
              />
              {carbonLevel === 'low' && index % 2 === 0 && (
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0] 
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </motion.div>
              )}
              {carbonLevel === 'low' && (
                <motion.div
                  className="absolute -bottom-1"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  <Leaf className="w-3 h-3 text-green-600" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Sparkles for low carbon */}
      <AnimatePresence>
        {carbonLevel === 'low' && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute text-yellow-400"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
