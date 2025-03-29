import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WaterQualityWidget from '@/components/WaterQualityWidget';
import WaterQualityChart from '@/components/WaterQualityChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWaterQuality, TimeRange } from '@/hooks/use-water-quality';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/auth-context';
import { useLanguage } from '@/context/language-context';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Download, RefreshCw, Activity, Thermometer, Droplet, Filter, WifiOff, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { downloadWaterQualityCSV, downloadAllParametersCSV } from '@/utils/csv-export';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LanguageSelector from '@/components/LanguageSelector';
import WaterUsageIndicator from '@/components/WaterUsageIndicator';
import ImprovementSuggestion from '@/components/ImprovementSuggestion';
import WaterAnimation from '@/components/WaterAnimation';

const Dashboard = () => {
  const { data, historicalData, loading, error, refetch } = useWaterQuality();
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const { t, language } = useLanguage();
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const [timeRange, setTimeRange] = useState<TimeRange>('day');
  const [showDetails, setShowDetails] = useState<boolean>(false);
  
  // Function to handle warnings based on water quality
  const getWarnings = () => {
    if (!data) return [];
    
    const warnings = [];
    
    if (data.pH < 6.5 || data.pH > 8.5) {
      warnings.push(`${t('pH')} (${data.pH}) is outside the optimal range of 6.5-8.5`);
    }
    
    if (data.TDS >= 600) {
      warnings.push(`${t('TDS')} (${data.TDS} ppm) is high - filtration recommended`);
    } else if (data.TDS >= 300) {
      warnings.push(`${t('TDS')} (${data.TDS} ppm) is moderate - monitor closely`);
    }
    
    if (data.Temperature < 10 || data.Temperature > 25) {
      warnings.push(`${t('Temperature')} (${data.Temperature}°C) is outside optimal range`);
    }
    
    return warnings;
  };
  
  // Auto-refresh data every 30 seconds if enabled
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (autoRefresh) {
      interval = setInterval(() => {
        refetch();
        setLastUpdated(new Date());
      }, 30000); // 30 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, refetch]);
  
  // Manual refresh handler
  const handleRefresh = () => {
    refetch();
    setLastUpdated(new Date());
    toast({
      title: "Data refreshed",
      description: "Water quality data has been updated",
    });
  };

  // Notify user if there's a data loading error
  useEffect(() => {
    if (error) {
      console.error("Dashboard data loading error:", error);
      toast({
        title: "Data loading error",
        description: "There was a problem loading the water quality data. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  // Function to get display name for time range
  const getTimeRangeDisplayName = (range: TimeRange) => {
    switch (range) {
      case 'day': return t('today');
      case 'week': return t('weekly');
      case 'month': return t('monthly');
      case 'year': return t('yearly');
      default: return t('today');
    }
  };
  
  // Function to handle CSV download for specific parameter and time range
  const handleParameterCSVDownload = (parameter: string) => {
    if (historicalData && historicalData[timeRange]) {
      downloadWaterQualityCSV(historicalData[timeRange], parameter, timeRange);
      toast({
        title: "Download started",
        description: `${parameter} data for ${getTimeRangeDisplayName(timeRange)} has been downloaded.`
      });
    }
  };
  
  // Function to handle CSV download for all parameters
  const handleAllParametersCSVDownload = () => {
    if (historicalData && historicalData[timeRange]) {
      downloadAllParametersCSV(historicalData[timeRange], timeRange);
      toast({
        title: "Download started",
        description: `All parameters data for ${getTimeRangeDisplayName(timeRange)} has been downloaded.`
      });
    }
  };

  const getRecommendation = (parameter: string, value: number) => {
    if (parameter === 'pH') {
      if (value < 6.5) return t('pHRecommendationAcidic');
      if (value > 8.5) return t('pHRecommendationAlkaline');
      return t('pHRecommendationNormal');
    }
    if (parameter === 'TDS') {
      if (value < 300) return t('tdsRecommendationLow');
      if (value < 600) return t('tdsRecommendationModerate');
      return t('tdsRecommendationHigh');
    }
    if (parameter === 'Temperature') {
      if (value < 10) return t('tempRecommendationLow');
      if (value > 25) return t('tempRecommendationHigh');
      return t('tempRecommendationNormal');
    }
    return '';
  };
  
  // Function to get usage level color
  const getUsageLevel = (parameter: string, value: number) => {
    if (parameter === 'pH') {
      if (value < 6.5 || value > 8.5) return 'high';
      if (value < 6.8 || value > 8.2) return 'moderate';
      return 'low';
    }
    if (parameter === 'TDS') {
      if (value >= 600) return 'high';
      if (value >= 300) return 'moderate';
      return 'low';
    }
    if (parameter === 'Temperature') {
      if (value < 10 || value > 25) return 'high';
      if (value < 15 || value > 22) return 'moderate';
      return 'low';
    }
    return 'low';
  };

  // Get improvement suggestions based on water parameters
  const getImprovementSuggestions = () => {
    if (!data) return [];
    
    const suggestions = [];
    
    // pH suggestions
    if (data.pH < 6.5) {
      suggestions.push({
        title: 'Increase Water pH',
        description: 'Your water is too acidic. Add a remineralization filter or pH-increasing solution.',
        icon: <Activity className="h-5 w-5" />,
        actionText: 'View filter options',
        priority: 'high'
      });
    } else if (data.pH > 8.5) {
      suggestions.push({
        title: 'Decrease Water pH',
        description: 'Your water is too alkaline. Install an acid injection system or water softener.',
        icon: <Activity className="h-5 w-5" />,
        actionText: 'View recommended systems',
        priority: 'high'
      });
    }
    
    // TDS suggestions
    if (data.TDS >= 600) {
      suggestions.push({
        title: 'High TDS Level Detected',
        description: 'TDS levels are high. Install a reverse osmosis system to reduce dissolved solids.',
        icon: <Filter className="h-5 w-5" />,
        actionText: 'Explore RO systems',
        priority: 'high'
      });
    } else if (data.TDS >= 300) {
      suggestions.push({
        title: 'Moderate TDS Level',
        description: 'Monitor TDS levels and consider installing an activated carbon filter.',
        icon: <Filter className="h-5 w-5" />,
        actionText: 'View filters',
        priority: 'medium'
      });
    }
    
    // Temperature suggestions
    if (data.Temperature < 10) {
      suggestions.push({
        title: 'Water Temperature Too Low',
        description: 'Consider insulating your water pipes to maintain optimal temperature.',
        icon: <Thermometer className="h-5 w-5" />,
        actionText: 'View insulation options',
        priority: 'medium'
      });
    } else if (data.Temperature > 25) {
      suggestions.push({
        title: 'Water Temperature Too High',
        description: 'High water temperature may promote bacterial growth. Consider water cooling solutions.',
        icon: <Thermometer className="h-5 w-5" />,
        actionText: 'Learn more',
        priority: 'high'
      });
    }
    
    // Add general maintenance suggestion if no immediate issues
    if (suggestions.length === 0) {
      suggestions.push({
        title: 'Maintain Optimal Water Quality',
        description: 'Regular maintenance ensures continued water quality. Check filters and equipment monthly.',
        icon: <Droplet className="h-5 w-5" />,
        actionText: 'View maintenance schedule',
        priority: 'low'
      });
    }
    
    // Add suggestion for water testing if not many issues
    if (suggestions.length <= 2) {
      suggestions.push({
        title: 'Regular Water Testing',
        description: 'Schedule regular water quality tests to monitor parameters over time.',
        icon: <Activity className="h-5 w-5" />,
        actionText: 'Set testing schedule',
        priority: 'low'
      });
    }
    
    return suggestions;
  };

  const warnings = getWarnings();
  const improvementSuggestions = getImprovementSuggestions();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">{t('waterQualityDashboard')}</h1>
            {currentUser && (
              <p className="text-sm text-muted-foreground mt-1">
                {t('welcome')}, <span className="font-medium">{currentUser}</span>
              </p>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <LanguageSelector variant="default" />
            
            <div className="text-sm text-muted-foreground">
              {t('lastUpdated')}: {lastUpdated.toLocaleTimeString()}
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center gap-1"
              >
                <RefreshCw className="h-4 w-4" />
                {t('refresh')}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={autoRefresh ? "text-green-600" : "text-muted-foreground"}
              >
                {t('auto')}: {autoRefresh ? "ON" : "OFF"}
              </Button>
              
              {/* CSV Download Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={loading || !data}
                    className="flex items-center gap-1"
                  >
                    <Download className="h-4 w-4" />
                    {t('downloadCSV')}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleParameterCSVDownload('pH')}>
                    pH Data
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleParameterCSVDownload('TDS')}>
                    TDS Data
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleParameterCSVDownload('Temperature')}>
                    Temperature Data
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleAllParametersCSVDownload}>
                    All Parameters
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        
        {/* Warnings Section */}
        {warnings.length > 0 && (
          <Card className="mb-6 border-amber-300 bg-amber-50 dark:bg-amber-950/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-amber-700 dark:text-amber-400 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 animate-bounce-small" />
                {t('alerts')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {warnings.map((warning, index) => (
                  <li key={index} className="text-amber-700 dark:text-amber-400 flex items-start gap-2 animate-slide-in" style={{animationDelay: `${index * 150}ms`}}>
                    <AlertTriangle className="h-5 w-5 mt-0.5" />
                    <span>{warning}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
        
        <div className="grid grid-cols-1 gap-6">
          {/* Water Quality Widget */}
          <WaterQualityWidget />
          
          {/* Time Range Tabs and Charts Section */}
          <div>
            <Tabs defaultValue="day" value={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)}>
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="day">{t('today')}</TabsTrigger>
                  <TabsTrigger value="week">{t('weekly')}</TabsTrigger>
                  <TabsTrigger value="month">{t('monthly')}</TabsTrigger>
                  <TabsTrigger value="year">{t('yearly')}</TabsTrigger>
                </TabsList>
              </div>
              
              {Object.keys(historicalData).map((range) => (
                <TabsContent key={range} value={range} className="m-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                      <>
                        <Skeleton className="h-[400px] w-full rounded-lg" />
                        <Skeleton className="h-[400px] w-full rounded-lg" />
                        <Skeleton className="h-[400px] w-full rounded-lg" />
                      </>
                    ) : error ? (
                      <Card className="md:col-span-2 lg:col-span-3">
                        <CardHeader>
                          <CardTitle>Error</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Failed to load chart data. Please try again later.</p>
                        </CardContent>
                      </Card>
                    ) : data ? (
                      <>
                        <WaterQualityChart
                          title={`${t('pH')} History`}
                          parameter="pH"
                          currentValue={data.pH}
                          unit=""
                          color="#0ea5e9"
                          timeRange={range as TimeRange}
                          data={historicalData[range as TimeRange]}
                        />
                        
                        <WaterQualityChart
                          title={`${t('TDS')} History`}
                          parameter="TDS"
                          currentValue={data.TDS}
                          unit=" ppm"
                          color="#10b981"
                          timeRange={range as TimeRange}
                          data={historicalData[range as TimeRange]}
                        />
                        
                        <WaterQualityChart
                          title={`${t('Temperature')} History`}
                          parameter="Temperature"
                          currentValue={data.Temperature}
                          unit="°C"
                          color="#f59e0b"
                          timeRange={range as TimeRange}
                          data={historicalData[range as TimeRange]}
                        />
                      </>
                    ) : null}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
          
          {/* Recommendations Section with Animations */}
          <Card className="overflow-hidden">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2 animate-fade-in">
                    <div className="relative h-5 w-5">
                      <Droplet className="absolute inset-0 text-water-500" />
                      <div className="absolute inset-0 animate-water-pulse">
                        <WaterAnimation type="ripple" color="#0ea5e9" height="100%" width="100%" duration={3} />
                      </div>
                    </div>
                    {t('recommendations')}
                  </CardTitle>
                  <CardDescription className="animate-fade-in" style={{animationDelay: '200ms'}}>
                    {t('basedOnCurrentData')}
                  </CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-sm"
                >
                  {showDetails ? t('showLess') : t('showDetails')}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <>
                  <Skeleton className="h-[20px] w-3/4 rounded-lg mb-4" />
                  <Skeleton className="h-4 w-full rounded-full mb-2" />
                  <Skeleton className="h-[20px] w-5/6 rounded-lg mb-4" />
                  <Skeleton className="h-4 w-full rounded-full mb-2" />
                  <Skeleton className="h-[20px] w-2/3 rounded-lg mb-4" />
                  <Skeleton className="h-4 w-full rounded-full" />
                </>
              ) : error ? (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <WifiOff className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Failed to load recommendations. Please try again later.</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="mt-4"
                    onClick={handleRefresh}
                  >
                    Try Again
                  </Button>
                </div>
              ) : data ? (
                <>
                  {/* Usage Indicators - Show when detailed view is off */}
                  {!showDetails && (
                    <div className="space-y-8 mb-6">
                      {/* pH Level with Water Animation */}
                      <div className="animate-fade-in" style={{animationDelay: '100ms'}}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div className="relative h-5 w-5">
                              <Droplet className={`absolute inset-0 ${getUsageLevel('pH', data.pH) === 'high' ? 'text-red-500' : getUsageLevel('pH', data.pH) === 'moderate' ? 'text-amber-500' : 'text-green-500'}`} />
                            </div>
                            <span className={`font-medium ${getUsageLevel('pH', data.pH) === 'high' ? 'text-red-700' : getUsageLevel('pH', data.pH) === 'moderate' ? 'text-amber-700' : 'text-green-700'}`}>
                              {t('pH')} Level
                            </span>
                          </div>
                          <span className={`text-sm font-medium ${getUsageLevel('pH', data.pH) === 'high' ? 'text-red-700' : getUsageLevel('pH', data.pH) === 'moderate' ? 'text-amber-700' : 'text-green-700'}`}>
                            {data.pH} / 14 ({Math.round((data.pH / 14) * 100)}%)
                          </span>
                        </div>
                        
                        <div className="relative h-16 rounded-md overflow-hidden border">
                          {/* Background scale for pH (0-14) */}
                          <div className="absolute inset-0 flex">
                            <div className="h-full w-1/7 bg-red-100"></div>
                            <div className="h-full w-1/7 bg-orange-100"></div>
                            <div className="h-full w-1/7 bg-yellow-100"></div>
                            <div className="h-full w-1/7 bg-green-100"></div>
                            <div className="h-full w-1/7 bg-blue-100"></div>
                            <div className="h-full w-1/7 bg-indigo-100"></div>
                            <div className="h-full w-1/7 bg-purple-100"></div>
                          </div>
                          
                          {/* pH indicator with animation */}
                          <div 
                            className="absolute bottom-0 top-0 left-0 flex items-center justify-center"
                            style={{ left: `${(data.pH / 14) * 100}%`, transform: 'translateX(-50%)' }}
                          >
                            <div className="h-12 w-12 rounded-full overflow-hidden relative">
                              <WaterAnimation 
                                type="ripple" 
                                color={
                                  getUsageLevel('pH', data.pH) === 'high' 
                                    ? '#ef4444' 
                                    : getUsageLevel('pH', data.pH) === 'moderate' 
                                      ? '#f59e0b' 
                                      : '#22c55e'
                                } 
                                height="100%"
                                width="100%"
                              />
                              <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                                {data.pH}
                              </div>
                            </div>
                          </div>
                          
                          {/* pH Scale labels */}
                          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-xs text-gray-500">
                            <span>0</span>
                            <span>Acidic</span>
                            <span>7</span>
                            <span>Basic</span>
                            <span>14</span>
                          </div>
                          
                          {/* Ideal range indicators */}
                          <div className="absolute top-0 bottom-0 left-[46.4%] w-[28.6%] border-l border-r border-green-400 opacity-50"></div>
                        </div>
                        
                        <p className="mt-2 text-sm text-muted-foreground animate-slide-in" style={{animationDelay: '0.2s'}}>
                          {getRecommendation('pH', data.pH)}
                        </p>
                      </div>
                      
                      {/* TDS Level with Water Animation */}
                      <div className="animate-fade-in" style={{animationDelay: '300ms'}}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div className="relative h-5 w-5">
                              <Filter className={`absolute inset-0 ${getUsageLevel('TDS', data.TDS) === 'high' ? 'text-red-500' : getUsageLevel('TDS', data.TDS) === 'moderate' ? 'text-amber-500' : 'text-green-500'}`} />
                            </div>
                            <span className={`font-medium ${getUsageLevel('TDS', data.TDS) === 'high' ? 'text-red-700' : getUsageLevel('TDS', data.TDS) === 'moderate' ? 'text-amber-700' : 'text-green-700'}`}>
                              {t('TDS')} Level
                            </span>
                          </div>
                          <span className={`text-sm font-medium ${getUsageLevel('TDS', data.TDS) === 'high' ? 'text-red-700' : getUsageLevel('TDS', data.TDS) === 'moderate' ? 'text-amber-700' : 'text-green-700'}`}>
                            {data.TDS} ppm
                          </span>
                        </div>
                        
                        <div className="relative h-16 rounded-md overflow-hidden border bg-gray-50">
                          {/* TDS Water Fill Animation */}
                          <div 
                            className="absolute bottom-0 left-0 h-full rounded-l-md overflow-hidden"
                            style={{ width: `${Math.min(100, (data.TDS / 1000) * 100)}%` }}
                          >
                            <WaterAnimation 
                              type="wave" 
                              color={
                                getUsageLevel('TDS', data.TDS) === 'high' 
                                  ? '#ef4444' 
                                  : getUsageLevel('TDS', data.TDS) === 'moderate' 
                                    ? '#f59e0b' 
                                    : '#22c55e'
                              } 
                              height="100%"
                              width="100%"
                            />
                          </div>
                          
                          {/* TDS Scale markers */}
                          <div className="absolute top-0 bottom-0 left-[30%] border-l border-dashed border-green-400"></div>
                          <div className="absolute top-0 bottom-0 left-[60%] border-l border-dashed border-amber-400"></div>
                          
                          {/* TDS Scale labels */}
                          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-xs text-gray-500">
                            <span>0</span>
                            <span>300</span>
                            <span>600</span>
                            <span>1000+ ppm</span>
                          </div>
                        </div>
                        
                        <p className="mt-2 text-sm text-muted-foreground animate-slide-in" style={{animationDelay: '0.2s'}}>
                          {getRecommendation('TDS', data.TDS)}
                        </p>
                      </div>
                      
                      {/* Temperature with Water Animation */}
                      <div className="animate-fade-in" style={{animationDelay: '500ms'}}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div className="relative h-5 w-5">
                              <Thermometer className={`absolute inset-0 ${getUsageLevel('Temperature', data.Temperature) === 'high' ? 'text-red-500' : getUsageLevel('Temperature', data.Temperature) === 'moderate' ? 'text-amber-500' : 'text-green-500'}`} />
                            </div>
                            <span className={`font-medium ${getUsageLevel('Temperature', data.Temperature) === 'high' ? 'text-red-700' : getUsageLevel('Temperature', data.Temperature) === 'moderate' ? 'text-amber-700' : 'text-green-700'}`}>
                              {t('Temperature')}
                            </span>
                          </div>
                          <span className={`text-sm font-medium ${getUsageLevel('Temperature', data.Temperature) === 'high' ? 'text-red-700' : getUsageLevel('Temperature', data.Temperature) === 'moderate' ? 'text-amber-700' : 'text-green-700'}`}>
                            {data.Temperature}°C
                          </span>
                        </div>
                        
                        <div className="relative h-16 rounded-md overflow-hidden border bg-gradient-to-r from-blue-100 via-green-100 to-red-100">
                          {/* Temperature indicator with animation */}
                          <div 
                            className="absolute bottom-0 top-0 left-0 flex items-center justify-center"
                            style={{ left: `${((data.Temperature - 0) / (40 - 0)) * 100}%`, transform: 'translateX(-50%)' }}
                          >
                            <div className="h-12 w-12 rounded-full overflow-hidden relative">
                              <WaterAnimation 
                                type={data.Temperature > 25 ? 'ripple' : 'wave'} 
                                color={
                                  getUsageLevel('Temperature', data.Temperature) === 'high' 
                                    ? '#ef4444' 
                                    : getUsageLevel('Temperature', data.Temperature) === 'moderate' 
                                      ? '#f59e0b' 
                                      : '#22c55e'
                                } 
                                height="100%"
                                width="100%"
                                duration={data.Temperature > 25 ? 1.5 : 3}
                              />
                              <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                                {data.Temperature}°
                              </div>
                            </div>
                          </div>
                          
                          {/* Temperature ideal range */}
                          <div className="absolute top-0 bottom-0 left-[25%] w-[37.5%] border-l border-r border-green-400 opacity-50"></div>
                          
                          {/* Temperature Scale labels */}
                          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-xs text-gray-500">
                            <span>0°C</span>
                            <span>10°C</span>
                            <span>25°C</span>
                            <span>40°C</span>
                          </div>
                        </div>
                        
                        <p className="mt-2 text-sm text-muted-foreground animate-slide-in" style={{animationDelay: '0.2s'}}>
                          {getRecommendation('Temperature', data.Temperature)}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Detailed Recommendations - Show when detailed view is on */}
                  {showDetails && (
                    <div className="relative space-y-4">
                      {/* Background water animation for recommendations */}
                      {improvementSuggestions.some(s => s.priority === 'high') && (
                        <div className="absolute top-0 right-0 w-32 h-32 opacity-20 pointer-events-none">
                          <WaterAnimation type="ripple" color="#ef4444" height="100%" width="100%" duration={2} />
                        </div>
                      )}
                      
                      {improvementSuggestions.map((suggestion, index) => (
                        <ImprovementSuggestion
                          key={index}
                          title={suggestion.title}
                          description={suggestion.description}
                          icon={suggestion.icon}
                          actionText={suggestion.actionText}
                          priority={suggestion.priority}
                          delay={index * 150}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
