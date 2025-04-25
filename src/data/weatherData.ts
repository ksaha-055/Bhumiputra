
// Weather forecast data for different regions in India
// Based on historical climate data and seasonal patterns

type WeatherDay = {
  day: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  description: string;
  icon: string;
};

type RegionWeatherData = {
  [region: string]: WeatherDay[];
};

// Create realistic weather forecast data for different regions of India
export const regionalWeatherData: RegionWeatherData = {
  "West Bengal": [
    { day: "Today", temperature: 36, humidity: 52, rainfall: 0, description: "Sunny", icon: "sun" },
    { day: "Tomorrow", temperature: 35, humidity: 50, rainfall: 0, description: "Partly Cloudy", icon: "cloud-sun" },
    { day: "Sun", temperature: 33, humidity: 78, rainfall: 8, description: "Light Rain", icon: "cloud-rain" },
    { day: "Mon", temperature: 32, humidity: 82, rainfall: 12, description: "Thunderstorms", icon: "cloud-rain" },
    { day: "Tue", temperature: 31, humidity: 76, rainfall: 4, description: "Light Rain", icon: "cloud-rain" },
    { day: "Wed", temperature: 32, humidity: 70, rainfall: 0, description: "Mostly Sunny", icon: "cloud-sun" },
    { day: "Thu", temperature: 33, humidity: 67, rainfall: 0, description: "Sunny", icon: "sun" },
  ],
  "Punjab": [
    { day: "Today", temperature: 38, humidity: 45, rainfall: 0, description: "Hot", icon: "sun" },
    { day: "Tomorrow", temperature: 37, humidity: 50, rainfall: 0, description: "Hot", icon: "sun" },
    { day: "Sun", temperature: 36, humidity: 48, rainfall: 0, description: "Hot", icon: "sun" },
    { day: "Mon", temperature: 38, humidity: 42, rainfall: 0, description: "Hot", icon: "sun" },
    { day: "Tue", temperature: 39, humidity: 40, rainfall: 0, description: "Hot", icon: "sun" },
    { day: "Wed", temperature: 37, humidity: 45, rainfall: 0, description: "Hot", icon: "sun" },
    { day: "Thu", temperature: 36, humidity: 50, rainfall: 3, description: "Light Rain", icon: "cloud-rain" },
  ],
  "Uttar Pradesh": [
    { day: "Today", temperature: 39, humidity: 48, rainfall: 0, description: "Hot", icon: "sun" },
    { day: "Tomorrow", temperature: 38, humidity: 52, rainfall: 0, description: "Hot", icon: "sun" },
    { day: "Sun", temperature: 37, humidity: 55, rainfall: 4, description: "Light Rain", icon: "cloud-rain" },
    { day: "Mon", temperature: 36, humidity: 60, rainfall: 8, description: "Rain", icon: "cloud-rain" },
    { day: "Tue", temperature: 35, humidity: 62, rainfall: 5, description: "Light Rain", icon: "cloud-rain" },
    { day: "Wed", temperature: 36, humidity: 57, rainfall: 0, description: "Partly Cloudy", icon: "cloud-sun" },
    { day: "Thu", temperature: 37, humidity: 50, rainfall: 0, description: "Sunny", icon: "sun" },
  ],
  "Maharashtra": [
    { day: "Today", temperature: 33, humidity: 68, rainfall: 6, description: "Light Rain", icon: "cloud-rain" },
    { day: "Tomorrow", temperature: 32, humidity: 72, rainfall: 12, description: "Rain", icon: "cloud-rain" },
    { day: "Sun", temperature: 30, humidity: 78, rainfall: 20, description: "Heavy Rain", icon: "cloud-rain" },
    { day: "Mon", temperature: 29, humidity: 82, rainfall: 18, description: "Heavy Rain", icon: "cloud-rain" },
    { day: "Tue", temperature: 30, humidity: 76, rainfall: 10, description: "Rain", icon: "cloud-rain" },
    { day: "Wed", temperature: 31, humidity: 70, rainfall: 5, description: "Light Rain", icon: "cloud-rain" },
    { day: "Thu", temperature: 32, humidity: 65, rainfall: 0, description: "Partly Cloudy", icon: "cloud-sun" },
  ],
  "Karnataka": [
    { day: "Today", temperature: 30, humidity: 62, rainfall: 0, description: "Partly Cloudy", icon: "cloud-sun" },
    { day: "Tomorrow", temperature: 31, humidity: 60, rainfall: 0, description: "Sunny", icon: "sun" },
    { day: "Sun", temperature: 32, humidity: 58, rainfall: 0, description: "Sunny", icon: "sun" },
    { day: "Mon", temperature: 31, humidity: 62, rainfall: 4, description: "Light Rain", icon: "cloud-rain" },
    { day: "Tue", temperature: 30, humidity: 65, rainfall: 8, description: "Rain", icon: "cloud-rain" },
    { day: "Wed", temperature: 29, humidity: 68, rainfall: 6, description: "Light Rain", icon: "cloud-rain" },
    { day: "Thu", temperature: 30, humidity: 64, rainfall: 0, description: "Partly Cloudy", icon: "cloud-sun" },
  ],
};

// Long-term climate forecast data for the next 12 months
export const longTermForecast = [
  { month: "May", avgTemp: 35, rainfall: 35, humidity: 60 },
  { month: "Jun", avgTemp: 33, rainfall: 130, humidity: 75 },
  { month: "Jul", avgTemp: 31, rainfall: 180, humidity: 85 },
  { month: "Aug", avgTemp: 30, rainfall: 200, humidity: 88 },
  { month: "Sep", avgTemp: 29, rainfall: 150, humidity: 82 },
  { month: "Oct", avgTemp: 28, rainfall: 70, humidity: 75 },
  { month: "Nov", avgTemp: 25, rainfall: 20, humidity: 65 },
  { month: "Dec", avgTemp: 22, rainfall: 10, humidity: 60 },
  { month: "Jan", avgTemp: 20, rainfall: 5, humidity: 55 },
  { month: "Feb", avgTemp: 22, rainfall: 10, humidity: 50 },
  { month: "Mar", avgTemp: 26, rainfall: 15, humidity: 55 },
  { month: "Apr", avgTemp: 30, rainfall: 25, humidity: 58 },
];

// Function to get weather data based on location
export const getWeatherForecast = (location: string): WeatherDay[] => {
  // Return data for the specified location or default to West Bengal if not found
  return regionalWeatherData[location] || regionalWeatherData["West Bengal"];
};

// Function to get weather description based on data
export const getSeasonalDescription = (location: string): string => {
  const data = getWeatherForecast(location);
  const avgRainfall = data.reduce((sum, day) => sum + day.rainfall, 0) / data.length;
  
  if (avgRainfall > 10) {
    return "Heavy monsoon conditions expected, ensure proper drainage and consider water-resistant crop varieties.";
  } else if (avgRainfall > 5) {
    return "Moderate rainfall expected, good conditions for most crops with adequate irrigation planning.";
  } else if (avgRainfall > 0) {
    return "Light rainfall expected, supplemental irrigation may be necessary for optimal crop growth.";
  } else {
    return "Dry conditions expected, irrigation will be essential for crop survival and growth.";
  }
};
