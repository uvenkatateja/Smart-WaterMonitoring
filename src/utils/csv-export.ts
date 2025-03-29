import { TimeRange, WaterQualityData } from "@/hooks/use-water-quality";

// Convert an array of objects to CSV string
const convertToCSV = (data: any[], headers: string[]) => {
  // Create header row
  const headerRow = headers.join(',');
  
  // Create data rows
  const rows = data.map(item => {
    return headers.map(header => {
      // Handle special formatting for timestamp
      if (header === 'timestamp' && item[header]) {
        const date = new Date(item[header]);
        return date.toLocaleString();
      }
      
      // Handle missing values
      if (item[header] === undefined || item[header] === null) {
        return '';
      }
      
      // Convert numbers to strings and escape any commas in strings
      const value = String(item[header]);
      return value.includes(',') ? `"${value}"` : value;
    }).join(',');
  });
  
  // Combine header and data rows
  return [headerRow, ...rows].join('\n');
};

// Generate a filename based on the data type and time range
const generateFilename = (
  parameter: string, 
  timeRange: TimeRange, 
  currentDate = new Date()
) => {
  const dateStr = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD
  return `clearwater_${parameter.toLowerCase()}_${timeRange}_${dateStr}.csv`;
};

// Generate and download CSV file for water quality data
export const downloadWaterQualityCSV = (
  data: WaterQualityData[], 
  parameter: string,
  timeRange: TimeRange
) => {
  if (!data || data.length === 0) {
    console.error('No data available for CSV export');
    return;
  }
  
  // Define headers based on parameter
  const headers = ['timestamp', parameter];
  
  // Prepare data for CSV (only include relevant fields)
  const csvData = data.map(item => ({
    timestamp: item.timestamp,
    [parameter]: item[parameter]
  }));
  
  // Convert to CSV string
  const csvString = convertToCSV(csvData, headers);
  
  // Create a blob and download link
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  // Set up and trigger download
  link.setAttribute('href', url);
  link.setAttribute('download', generateFilename(parameter, timeRange));
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Function to download all parameters as a single CSV
export const downloadAllParametersCSV = (
  data: WaterQualityData[],
  timeRange: TimeRange
) => {
  if (!data || data.length === 0) {
    console.error('No data available for CSV export');
    return;
  }
  
  // Define headers for all parameters
  const headers = ['timestamp', 'pH', 'TDS', 'Temperature', 'Condition'];
  
  // Convert to CSV string
  const csvString = convertToCSV(data, headers);
  
  // Create a blob and download link
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  // Set up and trigger download
  const currentDate = new Date();
  const dateStr = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD
  link.setAttribute('href', url);
  link.setAttribute('download', `clearwater_all_parameters_${timeRange}_${dateStr}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}; 