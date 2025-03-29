import React from 'react';
import { Droplet } from 'lucide-react';

interface WaterUsageIndicatorProps {
  value: number;  // Current value
  maxValue: number;  // Maximum value (full usage)
  label: string;
  color: 'low' | 'moderate' | 'high';
  showRecommendation?: boolean;
}

const WaterUsageIndicator: React.FC<WaterUsageIndicatorProps> = ({
  value,
  maxValue,
  label,
  color,
  showRecommendation = true
}) => {
  // Calculate percentage
  const percentage = Math.min(100, Math.round((value / maxValue) * 100));
  
  // Determine color scheme based on usage level
  const getColorClasses = () => {
    switch (color) {
      case 'low':
        return {
          bg: 'bg-green-100',
          fill: 'bg-green-500',
          text: 'text-green-700',
          droplet: 'text-green-500'
        };
      case 'moderate':
        return {
          bg: 'bg-amber-100',
          fill: 'bg-amber-500',
          text: 'text-amber-700',
          droplet: 'text-amber-500'
        };
      case 'high':
        return {
          bg: 'bg-red-100',
          fill: 'bg-red-500',
          text: 'text-red-700',
          droplet: 'text-red-500'
        };
      default:
        return {
          bg: 'bg-blue-100',
          fill: 'bg-blue-500',
          text: 'text-blue-700',
          droplet: 'text-blue-500'
        };
    }
  };

  const colorClasses = getColorClasses();
  
  // Get recommendation based on usage level
  const getRecommendation = () => {
    switch (color) {
      case 'low':
        return 'Excellent level. Continue with current practices.';
      case 'moderate':
        return 'Consider monitoring usage more frequently.';
      case 'high':
        return 'Immediate action recommended. Check filtration system.';
      default:
        return '';
    }
  };

  return (
    <div className="mb-4 animate-fade-in">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Droplet className={`h-5 w-5 ${colorClasses.droplet} animate-water-pulse`} />
          <span className={`font-medium ${colorClasses.text}`}>{label}</span>
        </div>
        <span className={`text-sm font-medium ${colorClasses.text}`}>
          {value} / {maxValue} ({percentage}%)
        </span>
      </div>
      
      <div className={`h-4 w-full ${colorClasses.bg} rounded-full overflow-hidden`}>
        <div 
          className={`h-full ${colorClasses.fill} animate-water-wave bg-gradient-to-r from-current to-current/70`}
          style={{ 
            width: `${percentage}%`,
            backgroundSize: '200% 100%'
          }}
        />
      </div>
      
      {showRecommendation && (
        <div className="mt-2 text-sm text-muted-foreground animate-slide-in" style={{animationDelay: '0.2s'}}>
          {getRecommendation()}
        </div>
      )}
    </div>
  );
};

export default WaterUsageIndicator; 