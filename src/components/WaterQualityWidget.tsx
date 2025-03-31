import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useWaterQuality } from '@/hooks/use-water-quality';
import { useLanguage } from '@/context/language-context';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface WaterQualityWidgetProps {
  showRealData?: boolean;
}

const WaterQualityWidget = ({ showRealData = true }: WaterQualityWidgetProps) => {
  const { data, loading, error } = useWaterQuality();
  const { t } = useLanguage();

  // Create zero data for when not showing real data
  const zeroData = {
    pH: 0,
    TDS: 0,
    Temperature: 0
  };

  // Use either real data or zero data based on showRealData prop
  const displayData = showRealData ? data : zeroData;

  // Function to get quality status based on parameter values
  const getQualityStatus = (param: string, value: number) => {
    if (!showRealData) return 'neutral'; // Return neutral status when not showing real data
    
    if (param === 'pH') {
      if (value >= 6.5 && value <= 8.5) return 'good';
      if ((value >= 6.0 && value < 6.5) || (value > 8.5 && value <= 9.0)) return 'moderate';
      return 'poor';
    }
    
    if (param === 'TDS') {
      if (value < 300) return 'good';
      if (value < 600) return 'moderate';
      return 'poor';
    }
    
    if (param === 'Temperature') {
      if (value >= 10 && value <= 25) return 'good';
      if ((value >= 5 && value < 10) || (value > 25 && value <= 30)) return 'moderate';
      return 'poor';
    }
    
    return 'neutral';
  };

  // Function to get display text for quality status
  const getStatusText = (status: string) => {
    if (!showRealData) return t('notMonitoring');
    
    switch (status) {
      case 'good': return t('optimalLevel');
      case 'moderate': return t('attentionNeeded');
      case 'poor': return t('actionRequired');
      default: return '';
    }
  };

  // Function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800 hover:bg-green-100/80';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80';
      case 'poor': return 'bg-red-100 text-red-800 hover:bg-red-100/80';
      case 'neutral': return 'bg-gray-100 text-gray-800 hover:bg-gray-100/80';
      default: return '';
    }
  };

  // Get current overall status
  const getOverallStatus = () => {
    if (!showRealData) return 'neutral';
    if (!data) return 'neutral';
    
    const statuses = [
      getQualityStatus('pH', data.pH),
      getQualityStatus('TDS', data.TDS),
      getQualityStatus('Temperature', data.Temperature)
    ];
    
    if (statuses.includes('poor')) return 'poor';
    if (statuses.includes('moderate')) return 'moderate';
    return 'good';
  };

  // Get icon for status
  const getStatusIcon = (status: string) => {
    if (status === 'good') return <CheckCircle className="h-4 w-4" />;
    return <AlertTriangle className="h-4 w-4" />;
  };

  // Determine overall water quality status
  const overallStatus = getOverallStatus();

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-6 w-[100px]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-[120px] w-full" />
            <Skeleton className="h-[120px] w-full" />
            <Skeleton className="h-[120px] w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200">
        <CardContent className="p-6">
          <div className="text-red-500 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            <p>{t('errorLoadingWaterQualityData')}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
          <div>
            <h2 className="text-2xl font-bold">{t('currentWaterQualityParameters')}</h2>
            <p className="text-muted-foreground">
              {!showRealData 
                ? t('clickStartToMonitor') 
                : t('realTimeWaterQualityDataForYourLocation')}
            </p>
          </div>
          <Badge 
            variant="outline" 
            className={`${getStatusColor(overallStatus)} px-3 py-1 text-xs flex items-center gap-1.5`}
          >
            {getStatusIcon(overallStatus)}
            <span>
              {overallStatus === 'good' ? t('good') : 
               overallStatus === 'moderate' ? t('moderate') : 
               overallStatus === 'poor' ? t('poor') : 
               t('notMonitoring')}
            </span>
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* pH Block */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-medium text-blue-700">{t('pH')} {t('level')}</h3>
                <p className="text-3xl font-bold text-blue-800">{displayData?.pH.toFixed(1)}</p>
              </div>
              <Badge 
                variant="outline" 
                className={`${getStatusColor(getQualityStatus('pH', displayData?.pH || 0))} mt-1`}
              >
                {getStatusText(getQualityStatus('pH', displayData?.pH || 0))}
              </Badge>
            </div>
            <progress 
              className="w-full [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-bar]:bg-blue-100 [&::-webkit-progress-value]:bg-blue-500 h-2"
              value={displayData?.pH || 0} 
              max="14"
            />
            <div className="flex justify-between text-xs text-blue-600 mt-1">
              <span>0</span>
              <span>7</span>
              <span>14</span>
            </div>
          </div>
          
          {/* TDS Block */}
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-medium text-green-700">{t('TDS')}</h3>
                <div className="flex items-baseline gap-1">
                  <p className="text-3xl font-bold text-green-800">{displayData?.TDS.toFixed(2)}</p>
                  <span className="text-sm text-green-600">ppm</span>
                </div>
              </div>
              <Badge 
                variant="outline" 
                className={`${getStatusColor(getQualityStatus('TDS', displayData?.TDS || 0))} mt-1`}
              >
                {getStatusText(getQualityStatus('TDS', displayData?.TDS || 0))}
              </Badge>
            </div>
            <progress 
              className="w-full [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-bar]:bg-green-100 [&::-webkit-progress-value]:bg-green-500 h-2"
              value={displayData?.TDS || 0} 
              max="1000"
            />
            <div className="flex justify-between text-xs text-green-600 mt-1">
              <span>0</span>
              <span>300</span>
              <span>600</span>
              <span>1000+</span>
            </div>
          </div>
          
          {/* Temperature Block */}
          <div className="bg-amber-50 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-medium text-amber-700">{t('Temperature')}</h3>
                <div className="flex items-baseline gap-1">
                  <p className="text-3xl font-bold text-amber-800">{displayData?.Temperature.toFixed(2)}</p>
                  <span className="text-sm text-amber-600">°C</span>
                </div>
              </div>
              <Badge 
                variant="outline" 
                className={`${getStatusColor(getQualityStatus('Temperature', displayData?.Temperature || 0))} mt-1`}
              >
                {getStatusText(getQualityStatus('Temperature', displayData?.Temperature || 0))}
              </Badge>
            </div>
            <progress 
              className="w-full [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-bar]:bg-amber-100 [&::-webkit-progress-value]:bg-amber-500 h-2"
              value={displayData?.Temperature || 0} 
              max="40"
            />
            <div className="flex justify-between text-xs text-amber-600 mt-1">
              <span>0°C</span>
              <span>10°C</span>
              <span>25°C</span>
              <span>40°C</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterQualityWidget;
