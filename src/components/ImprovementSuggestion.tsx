import React from 'react';

interface ImprovementSuggestionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  actionText?: string;
  priority: 'low' | 'medium' | 'high';
  delay?: number;
}

const ImprovementSuggestion: React.FC<ImprovementSuggestionProps> = ({
  title,
  description,
  icon,
  actionText,
  priority,
  delay = 0
}) => {
  // Determine color and animation based on priority
  const getPriorityClasses = () => {
    switch (priority) {
      case 'high':
        return {
          border: 'border-l-4 border-l-red-500',
          bg: 'bg-red-50',
          icon: 'bg-red-100 text-red-600',
          title: 'text-red-800',
          animation: 'animate-pulse'
        };
      case 'medium':
        return {
          border: 'border-l-4 border-l-amber-400',
          bg: 'bg-amber-50',
          icon: 'bg-amber-100 text-amber-600',
          title: 'text-amber-800',
          animation: ''
        };
      case 'low':
      default:
        return {
          border: 'border-l-4 border-l-green-500',
          bg: 'bg-green-50',
          icon: 'bg-green-100 text-green-600',
          title: 'text-green-800',
          animation: ''
        };
    }
  };

  const classes = getPriorityClasses();
  
  return (
    <div 
      className={`p-4 rounded-r-lg ${classes.border} ${classes.bg} animate-slide-in shadow-sm hover:shadow-md transition-shadow duration-200`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full ${classes.icon} ${priority === 'high' ? 'animate-bounce-small' : ''}`}>
          {icon}
        </div>
        
        <div className="flex-1">
          <h4 className={`font-medium mb-1 ${classes.title} flex items-center gap-2`}>
            {title}
            {priority === 'high' && (
              <span className="text-xs bg-red-200 text-red-800 px-2 py-0.5 rounded-full">
                Immediate Action
              </span>
            )}
          </h4>
          
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          
          {actionText && (
            <button 
              className="text-sm font-medium text-water-600 hover:text-water-700 flex items-center gap-1 transition-colors"
            >
              {actionText}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImprovementSuggestion; 