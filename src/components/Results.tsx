import { CarbonResult } from '@/types/carbon';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { categoryNames } from '@/data/activities';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { RefreshCw, Share2, TrendingDown, TrendingUp, Leaf } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ResultsProps {
  result: CarbonResult;
  onRestart: () => void;
}

const COLORS = {
  transport: 'hsl(var(--primary))',
  energy: 'hsl(var(--accent))',
  food: 'hsl(var(--success))',
  digital: 'hsl(var(--warning))',
  waste: 'hsl(var(--danger))',
};

export function Results({ result, onRestart }: ResultsProps) {
  const [animatedTotal, setAnimatedTotal] = useState(0);
  const averageFootprint = 4000;
  const comparison = ((result.totalCarbon - averageFootprint) / averageFootprint) * 100;

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = result.totalCarbon / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= result.totalCarbon) {
        setAnimatedTotal(Math.round(result.totalCarbon));
        clearInterval(timer);
      } else {
        setAnimatedTotal(Math.round(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [result.totalCarbon]);

  const chartData = result.categoryBreakdown
    .filter(c => c.total > 0)
    .map(c => ({
      name: categoryNames[c.category],
      value: Math.round(c.total),
      percentage: c.percentage.toFixed(1),
    }));

  const tips = {
    low: [
      'Great job! Keep using public transport and cycling',
      'Continue your sustainable habits',
      'Share your eco-friendly lifestyle with others',
    ],
    medium: [
      'Consider reducing car usage by carpooling',
      'Switch to renewable energy sources',
      'Buy local and seasonal produce',
      'Reduce meat consumption to 2-3 times per week',
    ],
    high: [
      'Switch to public transport or cycling for short trips',
      'Reduce flight travel - consider video calls',
      'Install LED bulbs and energy-efficient appliances',
      'Adopt a more plant-based diet',
      'Start recycling and composting',
    ],
  };

  const bgClass = result.level === 'low' ? 'from-bg-low' : 
                  result.level === 'medium' ? 'from-bg-medium' : 'from-bg-high';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgClass} to-background px-4 py-12 transition-all duration-1000`}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full 
            ${result.level === 'low' ? 'bg-success/10 border-success/20' : ''}
            ${result.level === 'medium' ? 'bg-warning/10 border-warning/20' : ''}
            ${result.level === 'high' ? 'bg-danger/10 border-danger/20' : ''}
            border`}>
            <Leaf className={`w-5 h-5 
              ${result.level === 'low' ? 'text-success' : ''}
              ${result.level === 'medium' ? 'text-warning' : ''}
              ${result.level === 'high' ? 'text-danger' : ''}
            `} />
            <span className={`text-sm font-medium
              ${result.level === 'low' ? 'text-success' : ''}
              ${result.level === 'medium' ? 'text-warning' : ''}
              ${result.level === 'high' ? 'text-danger' : ''}
            `}>
              {result.level === 'low' ? 'Excellent!' : result.level === 'medium' ? 'Good Progress' : 'Room for Improvement'}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Your Carbon Footprint Results
          </h1>
        </div>

        {/* Main Result Card */}
        <Card className="p-8 bg-card border-border shadow-glow animate-scale-in">
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <div className="text-6xl md:text-8xl font-bold text-primary animate-count-up">
                {animatedTotal.toLocaleString()}
              </div>
              <div className="text-xl text-muted-foreground">kg CO₂ per year</div>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              {comparison > 0 ? (
                <>
                  <TrendingUp className="w-5 h-5 text-danger" />
                  <span>{Math.abs(comparison).toFixed(0)}% above average</span>
                </>
              ) : (
                <>
                  <TrendingDown className="w-5 h-5 text-success" />
                  <span>{Math.abs(comparison).toFixed(0)}% below average</span>
                </>
              )}
              <span className="text-sm">(avg: {averageFootprint.toLocaleString()} kg)</span>
            </div>
          </div>
        </Card>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6 bg-card border-border animate-slide-up">
            <h3 className="text-xl font-semibold mb-4 text-card-foreground">Breakdown by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem'
                  }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[result.categoryBreakdown[index]?.category as keyof typeof COLORS] || 'hsl(var(--primary))'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-card border-border animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-xl font-semibold mb-4 text-card-foreground">Percentage Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={100}
                  fill="hsl(var(--primary))"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[result.categoryBreakdown[index]?.category as keyof typeof COLORS] || 'hsl(var(--primary))'} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="p-6 bg-card border-border animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-xl font-semibold mb-4 text-card-foreground">💡 Personalized Tips to Reduce Your Footprint</h3>
          <ul className="space-y-3">
            {tips[result.level].map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span className="text-muted-foreground">{tip}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button onClick={onRestart} variant="outline" size="lg">
            <RefreshCw className="w-5 h-5 mr-2" />
            Start New Assessment
          </Button>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => {
              const text = `I calculated my carbon footprint: ${result.totalCarbon.toLocaleString()} kg CO₂/year! Calculate yours too! 🌍`;
              navigator.share?.({ text }) || navigator.clipboard.writeText(text);
            }}
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share Results
          </Button>
        </div>
      </div>
    </div>
  );
}
