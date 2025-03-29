import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TimeRange } from '@/hooks/use-water-quality';

// Sample data - In a real implementation, this would come from the Firebase database
const generateSampleData = (currentValue: number, dataPoints = 24) => {
  const data = [];
  const now = new Date();
  
  for (let i = dataPoints - 1; i >= 0; i--) {
    const time = new Date(now);
    time.setHours(now.getHours() - i);
    
    // Generate a value that fluctuates around the current value
    const randomFactor = Math.random() * 0.4 - 0.2; // +/- 20%
    const value = Number((currentValue * (1 + randomFactor)).toFixed(2));
    
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      value,
    });
  }
  
  return data;
};

type WaterQualityChartProps = {
  title: string;
  parameter: string;
  currentValue: number;
  unit: string;
  color?: string;
  className?: string;
  timeRange?: TimeRange;
  data: Array<{
    timestamp?: string;
    [key: string]: any;
  }>;
};

const WaterQualityChart: React.FC<WaterQualityChartProps> = ({
  title,
  parameter,
  currentValue,
  unit,
  color = "#0ea5e9",
  className,
  timeRange = 'day',
  data = []
}) => {
  // Format data for chart based on time range
  const formatChartData = () => {
    return data.filter(entry => entry.timestamp).map(entry => {
      const date = new Date(entry.timestamp!);
      let formattedTime;
      
      switch (timeRange) {
        case 'day':
          formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          break;
        case 'week':
          formattedTime = date.toLocaleDateString([], { weekday: 'short' });
          break;
        case 'month':
          formattedTime = date.toLocaleDateString([], { day: 'numeric', month: 'short' });
          break;
        case 'year':
          formattedTime = date.toLocaleDateString([], { month: 'short' });
          break;
        default:
          formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
      
      return {
        time: formattedTime,
        date, // Keep the full date for sorting
        value: entry[parameter],
        timestamp: entry.timestamp
      };
    });
  };
  
  const chartData = formatChartData();
  
  // Find limits for optimal ranges
  const getOptimalRange = () => {
    switch (parameter) {
      case 'pH':
        return { min: 6.5, max: 8.5 };
      case 'TDS':
        return { min: 0, max: 300 }; // Below 300 is excellent
      case 'Temperature':
        return { min: 10, max: 25 };
      default:
        return { min: null, max: null };
    }
  };
  
  const optimalRange = getOptimalRange();
  
  // Helper to format the date for tooltip based on time range
  const formatTooltipDate = (timestamp: string | undefined) => {
    if (!timestamp) return 'Date unknown';
    
    const date = new Date(timestamp);
    
    switch (timeRange) {
      case 'day':
        return date.toLocaleString([], { 
          hour: '2-digit', 
          minute: '2-digit',
          month: 'short',
          day: 'numeric'
        });
      case 'week':
        return date.toLocaleDateString([], { 
          weekday: 'long',
          month: 'short',
          day: 'numeric' 
        });
      case 'month':
        return date.toLocaleDateString([], { 
          month: 'short',
          day: 'numeric',
          year: 'numeric' 
        });
      case 'year':
        return date.toLocaleDateString([], { 
          month: 'long',
          year: 'numeric' 
        });
      default:
        return date.toLocaleString();
    }
  };
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border rounded shadow-md">
          <p className="font-medium">{formatTooltipDate(dataPoint.timestamp)}</p>
          <p className="text-sm">
            {parameter}: <span className="font-medium">{dataPoint.value}{unit}</span>
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{title}</span>
          <span className="text-sm font-normal text-muted-foreground">
            Current: <span className="font-medium">{currentValue}{unit}</span>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="time" 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => `${value}${unit}`}
              />
              
              {/* Add reference lines for optimal ranges */}
              {optimalRange.min !== null && (
                <ReferenceLine 
                  y={optimalRange.min} 
                  stroke="#22c55e" 
                  strokeDasharray="3 3"
                  label={{ value: 'Min', position: 'insideBottomLeft', fontSize: 10 }}
                />
              )}
              
              {optimalRange.max !== null && (
                <ReferenceLine 
                  y={optimalRange.max} 
                  stroke="#22c55e" 
                  strokeDasharray="3 3"
                  label={{ value: 'Max', position: 'insideTopLeft', fontSize: 10 }}
                />
              )}
              
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              <Line
                type="monotone"
                dataKey="value"
                name={parameter}
                stroke={color}
                strokeWidth={2}
                dot={(props) => {
                  const { cx, cy, payload } = props;
                  // Check if value is outside optimal range
                  const isOutsideRange = 
                    (optimalRange.min !== null && payload.value < optimalRange.min) ||
                    (optimalRange.max !== null && payload.value > optimalRange.max);
                  
                  if (isOutsideRange) {
                    return (
                      <svg x={cx - 5} y={cy - 5} width={10} height={10}>
                        <circle cx={5} cy={5} r={5} fill="#ef4444" />
                      </svg>
                    );
                  }
                  return (
                    <svg x={cx - 3} y={cy - 3} width={6} height={6}>
                      <circle cx={3} cy={3} r={3} fill={color} />
                    </svg>
                  );
                }}
                activeDot={{ r: 8, fill: color }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterQualityChart;
