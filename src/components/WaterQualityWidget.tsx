
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import WaterQualityCard from './WaterQualityCard';
import WaterQualityStatus from './WaterQualityStatus';
import { useWaterQuality } from '@/hooks/use-water-quality';
import { Skeleton } from '@/components/ui/skeleton';

const WaterQualityWidget = () => {
  const { data, loading, error } = useWaterQuality();
  
  console.log("Water Quality Data:", data);
  console.log("Loading state:", loading);
  console.log("Error state:", error);

  // Helper function to determine pH status
  const getPHStatus = (ph: number) => {
    if (ph >= 6.5 && ph <= 8.5) return 'good';
    if ((ph >= 6.0 && ph < 6.5) || (ph > 8.5 && ph <= 9.0)) return 'warning';
    return 'danger';
  };

  // Helper function to determine TDS status
  const getTDSStatus = (tds: number) => {
    if (tds < 300) return 'good';
    if (tds >= 300 && tds < 600) return 'warning';
    return 'danger';
  };

  // Helper function to determine temperature status
  const getTemperatureStatus = (temp: number) => {
    if (temp >= 10 && temp <= 25) return 'good';
    if ((temp >= 5 && temp < 10) || (temp > 25 && temp <= 30)) return 'warning';
    return 'danger';
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Water Quality</CardTitle>
          <CardDescription>Current water quality parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-[140px] w-full rounded-lg" />
            <Skeleton className="h-[140px] w-full rounded-lg" />
            <Skeleton className="h-[140px] w-full rounded-lg" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    console.error("Water Quality Error:", error);
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Failed to load water quality data. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    console.warn("No water quality data available");
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No water quality data available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Water Quality</CardTitle>
            <CardDescription>Current water quality parameters</CardDescription>
          </div>
          <WaterQualityStatus condition={data.Condition} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <WaterQualityCard
            title="pH Level"
            value={data.pH}
            unit=""
            icon="ph"
            status={getPHStatus(data.pH)}
          />
          <WaterQualityCard
            title="TDS"
            value={data.TDS}
            unit="ppm"
            icon="tds"
            status={getTDSStatus(data.TDS)}
          />
          <WaterQualityCard
            title="Temperature"
            value={data.Temperature}
            unit="°C"
            icon="temperature"
            status={getTemperatureStatus(data.Temperature)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterQualityWidget;
