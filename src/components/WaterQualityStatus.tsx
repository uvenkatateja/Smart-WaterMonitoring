
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type WaterQualityStatusProps = {
  condition: string;
  className?: string;
};

const getStatusColor = (condition: string) => {
  const conditionLower = condition.toLowerCase();
  if (conditionLower.includes('good') || conditionLower.includes('excellent')) return 'bg-green-500';
  if (conditionLower.includes('fair') || conditionLower.includes('moderate')) return 'bg-amber-500';
  if (conditionLower.includes('poor') || conditionLower.includes('bad')) return 'bg-red-500';
  return 'bg-primary';
};

const WaterQualityStatus: React.FC<WaterQualityStatusProps> = ({ condition, className }) => {
  return (
    <Badge className={cn(getStatusColor(condition), 'text-white px-3 py-1', className)}>
      {condition}
    </Badge>
  );
};

export default WaterQualityStatus;
