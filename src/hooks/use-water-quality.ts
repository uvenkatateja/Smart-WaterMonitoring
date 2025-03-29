import { useEffect, useState, useCallback } from 'react';
import { ref, onValue, get } from 'firebase/database';
import { db } from '@/lib/firebase';

export type WaterQualityData = {
  Condition: string;
  pH: number;
  TDS: number;
  Temperature: number;
  timestamp?: string;
};

export type TimeRange = 'day' | 'week' | 'month' | 'year';

// Function to generate sample historical data for demo purposes
const generateHistoricalData = (currentData: WaterQualityData | null, timeRange: TimeRange) => {
  if (!currentData) return [];
  
  const now = new Date();
  const data = [];
  
  // Determine number of data points and time increment based on range
  let dataPoints: number;
  let timeIncrement: number;
  
  switch (timeRange) {
    case 'day':
      dataPoints = 24; // Every hour
      timeIncrement = 60 * 60 * 1000; // 1 hour in ms
      break;
    case 'week':
      dataPoints = 7; // Daily
      timeIncrement = 24 * 60 * 60 * 1000; // 1 day in ms
      break;
    case 'month':
      dataPoints = 30; // Daily
      timeIncrement = 24 * 60 * 60 * 1000; // 1 day in ms
      break;
    case 'year':
      dataPoints = 12; // Monthly
      timeIncrement = 30 * 24 * 60 * 60 * 1000; // ~30 days in ms
      break;
    default:
      dataPoints = 24;
      timeIncrement = 60 * 60 * 1000;
  }
  
  for (let i = dataPoints - 1; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - (i * timeIncrement));
    
    // Create variations from current values
    const randomFactor = () => Math.random() * 0.4 - 0.2; // ±20%
    
    const entry = {
      timestamp: timestamp.toISOString(),
      pH: parseFloat((currentData.pH * (1 + randomFactor())).toFixed(1)),
      TDS: Math.round(currentData.TDS * (1 + randomFactor())),
      Temperature: parseFloat((currentData.Temperature * (1 + randomFactor())).toFixed(1)),
      Condition: determineCondition(
        parseFloat((currentData.pH * (1 + randomFactor())).toFixed(1)),
        Math.round(currentData.TDS * (1 + randomFactor())),
        parseFloat((currentData.Temperature * (1 + randomFactor())).toFixed(1))
      )
    };
    
    data.push(entry);
  }
  
  return data;
};

// Function to determine condition based on water parameters
const determineCondition = (pH: number, TDS: number, Temperature: number): string => {
  if (pH < 6.0 || pH > 9.0 || TDS > 600 || Temperature < 5 || Temperature > 30) {
    return 'Poor';
  } else if (pH < 6.5 || pH > 8.5 || TDS > 300 || Temperature < 10 || Temperature > 25) {
    return 'Fair';
  }
  return 'Good';
};

export const useWaterQuality = () => {
  const [data, setData] = useState<WaterQualityData | null>(null);
  const [historicalData, setHistoricalData] = useState<{[key in TimeRange]: WaterQualityData[]}>({
    day: [],
    week: [],
    month: [],
    year: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch data function that can be called on demand
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      console.log("Fetching water quality data from Firebase");
      const waterQualityRef = ref(db, 'WaterQuality');
      const snapshot = await get(waterQualityRef);
      
      if (snapshot.exists()) {
        const waterData = snapshot.val();
        // Add timestamp to the data
        const dataWithTimestamp = {
          ...waterData,
          timestamp: new Date().toISOString()
        };
        
        console.log("Firebase data received:", dataWithTimestamp);
        setData(dataWithTimestamp);
        
        // Generate historical data for each time range
        const day = generateHistoricalData(dataWithTimestamp, 'day');
        const week = generateHistoricalData(dataWithTimestamp, 'week');
        const month = generateHistoricalData(dataWithTimestamp, 'month');
        const year = generateHistoricalData(dataWithTimestamp, 'year');
        
        setHistoricalData({ day, week, month, year });
      } else {
        console.warn("No data available in Firebase");
      }
    } catch (err) {
      console.error('Error fetching water quality data:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data load
  useEffect(() => {
    console.log("Initializing Firebase connection to WaterQuality node");
    const waterQualityRef = ref(db, 'WaterQuality');
    
    const unsubscribe = onValue(
      waterQualityRef, 
      (snapshot) => {
        const waterData = snapshot.val();
        console.log("Firebase data received:", waterData);
        
        // Add timestamp to the data
        const dataWithTimestamp = {
          ...waterData,
          timestamp: new Date().toISOString()
        };
        
        setData(dataWithTimestamp);
        
        // Generate historical data for each time range
        const day = generateHistoricalData(dataWithTimestamp, 'day');
        const week = generateHistoricalData(dataWithTimestamp, 'week');
        const month = generateHistoricalData(dataWithTimestamp, 'month');
        const year = generateHistoricalData(dataWithTimestamp, 'year');
        
        setHistoricalData({ day, week, month, year });
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching water quality data:', err);
        setError(err);
        setLoading(false);
      }
    );

    return () => {
      console.log("Unsubscribing from Firebase");
      unsubscribe();
    };
  }, []);

  // Function to refresh data on demand
  const refetch = async () => {
    await fetchData();
  };

  return { data, historicalData, loading, error, refetch };
};
