import React from 'react';

interface WaterAnimationProps {
  type: 'wave' | 'ripple' | 'fill' | 'drop';
  color?: string;
  height?: number | string;
  width?: number | string;
  duration?: number;
  className?: string;
}

const WaterAnimation: React.FC<WaterAnimationProps> = ({
  type = 'wave',
  color = '#38bdf8', // default water-400 color
  height = '100px',
  width = '100%',
  duration = 3,
  className = '',
}) => {
  
  // Convert height and width to string values with units if they're numbers
  const heightValue = typeof height === 'number' ? `${height}px` : height;
  const widthValue = typeof width === 'number' ? `${width}px` : width;
  
  // Wave animation - horizontal flowing water
  if (type === 'wave') {
    return (
      <div 
        className={`relative overflow-hidden ${className}`}
        style={{ height: heightValue, width: widthValue }}
      >
        <div 
          className="absolute inset-0 animate-water-wave bg-gradient-to-r"
          style={{ 
            backgroundSize: '200% 100%',
            backgroundImage: `linear-gradient(90deg, 
              ${color}40 0%, 
              ${color}70 25%, 
              ${color}90 50%, 
              ${color}70 75%, 
              ${color}40 100%)`,
            animationDuration: `${duration}s`
          }}
        />
        <div 
          className="absolute inset-0 animate-water-wave bg-gradient-to-r opacity-50"
          style={{ 
            backgroundSize: '200% 100%',
            backgroundImage: `linear-gradient(270deg, 
              ${color}30 0%, 
              ${color}60 25%, 
              ${color}80 50%, 
              ${color}60 75%, 
              ${color}30 100%)`,
            animationDuration: `${duration * 1.5}s`,
            animationDelay: '0.5s'
          }}
        />
      </div>
    );
  }
  
  // Ripple animation - concentric circles
  if (type === 'ripple') {
    const maxSize = typeof width === 'number' ? width : 100;
    return (
      <div 
        className={`relative rounded-full overflow-hidden ${className}`}
        style={{ height: heightValue, width: widthValue }}
      >
        <div className="absolute inset-0 bg-water-100 opacity-60"></div>
        <div 
          className="absolute left-1/2 top-1/2 w-4 h-4 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{ backgroundColor: color }}
        />
        {[1, 2, 3].map((index) => (
          <div 
            key={index}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: 'transparent',
              border: `2px solid ${color}`,
              animation: `ripple-animation ${duration}s ease-out infinite`,
              animationDelay: `${index * 0.6}s`
            }}
          />
        ))}
        
        <style>
          {`
            @keyframes ripple-animation {
              0% {
                width: 8px;
                height: 8px;
                opacity: 0.8;
              }
              100% {
                width: ${maxSize}px;
                height: ${maxSize}px;
                opacity: 0;
              }
            }
          `}
        </style>
      </div>
    );
  }
  
  // Fill animation - vertical water filling
  if (type === 'fill') {
    return (
      <div 
        className={`relative overflow-hidden rounded-sm ${className}`}
        style={{ height: heightValue, width: widthValue }}
      >
        <div className="absolute inset-0 bg-water-50 bg-opacity-30"></div>
        <div 
          className="absolute bottom-0 left-0 right-0 animate-water-fill"
          style={{ 
            backgroundColor: color,
            height: '100%',
            '--fill-width': '100%',
            animationDuration: `${duration}s`
          } as React.CSSProperties}
        >
          <div 
            className="absolute top-0 left-0 right-0 h-2 bg-white opacity-30 animate-water-wave"
            style={{ 
              backgroundSize: '200% 100%',
              animationDuration: `${duration * 1.2}s`
            }}
          />
        </div>
      </div>
    );
  }
  
  // Drop animation - single water drop
  if (type === 'drop') {
    return (
      <div 
        className={`relative ${className}`}
        style={{ height: heightValue, width: widthValue }}
      >
        <div 
          className="absolute left-1/2 top-0 -translate-x-1/2 animate-bounce-small" 
          style={{ 
            width: '20px',
            height: '20px',
            borderRadius: '0 50% 50% 50%',
            transform: 'rotate(45deg) translateX(-50%)',
            backgroundColor: color,
            animationDuration: `${duration}s`
          }}
        />
      </div>
    );
  }
  
  return null;
};

export default WaterAnimation; 