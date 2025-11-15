import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export function Hero({ onStart }: HeroProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-bg-low to-background animate-fade-in">
      <div className="max-w-4xl text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-scale-in">
          <Leaf className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-primary">Digital Future • Science City Exhibition</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight animate-slide-up">
          Calculate Your
          <span className="block text-transparent bg-clip-text bg-gradient-eco mt-2">
            Carbon Footprint
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Discover your environmental impact through interactive questions about your daily activities. 
          Get personalized insights and actionable tips to reduce your carbon emissions.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Button 
            size="lg" 
            onClick={onStart}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow group"
          >
            Start Assessment
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs">🌍</div>
              <div className="w-8 h-8 rounded-full bg-accent/20 border-2 border-background flex items-center justify-center text-xs">🌱</div>
              <div className="w-8 h-8 rounded-full bg-warning/20 border-2 border-background flex items-center justify-center text-xs">♻️</div>
            </div>
            <span>Join thousands making a difference</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">5</div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">2-3</div>
            <div className="text-sm text-muted-foreground">Minutes</div>
          </div>
        </div>
      </div>
    </div>
  );
}
