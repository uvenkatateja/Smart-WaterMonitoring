
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gauge, Thermometer, Droplet } from 'lucide-react';
import { cn } from '@/lib/utils';

type WaterQualityCardProps = {
  title: string;
  value: number | string;
  unit: string;
  icon: 'ph' | 'tds' | 'temperature';
  status?: 'good' | 'warning' | 'danger';
  className?: string;
};

const getStatusColor = (status?: 'good' | 'warning' | 'danger') => {
  if (status === 'good') return 'text-green-500';
  if (status === 'warning') return 'text-amber-500';
  if (status === 'danger') return 'text-red-500';
  return 'text-primary';
};

const getIcon = (icon: 'ph' | 'tds' | 'temperature', status?: 'good' | 'warning' | 'danger') => {
  const color = getStatusColor(status);

  switch (icon) {
    case 'ph':
      return <Droplet className={cn('h-6 w-6', color)} />;
    case 'tds':
      return <Gauge className={cn('h-6 w-6', color)} />;
    case 'temperature':
      return <Thermometer className={cn('h-6 w-6', color)} />;
    default:
      return <Droplet className={cn('h-6 w-6', color)} />;
  }
};

const WaterQualityCard: React.FC<WaterQualityCardProps> = ({
  title,
  value,
  unit,
  icon,
  status,
  className,
}) => {
  const statusColor = getStatusColor(status);

  return (
    <Card className={cn('shadow-lg overflow-hidden', className)}>
      <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-background/80 rounded-full p-2">
        {getIcon(icon, status)}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end space-x-1">
          <span className={cn('text-3xl font-bold', statusColor)}>{value}</span>
          <span className="text-sm text-muted-foreground pb-1">{unit}</span>
        </div>
        <div className={cn('text-sm mt-2', statusColor)}>
          {status === 'good' && 'Optimal level'}
          {status === 'warning' && 'Attention needed'}
          {status === 'danger' && 'Critical level'}
          {!status && 'Monitoring'}
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterQualityCard;
