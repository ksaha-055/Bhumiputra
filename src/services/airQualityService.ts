import axios from 'axios';

const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
const BASE_URL = 'https://api.api-ninjas.com/v1/airquality';

export interface AirQualityData {
  overall_aqi: number;
  PM2_5: { concentration: number; aqi: number };
  PM10: { concentration: number; aqi: number };
  O3: { concentration: number; aqi: number };
  NO2: { concentration: number; aqi: number };
  SO2: { concentration: number; aqi: number };
  CO: { concentration: number; aqi: number };
}

export const getAirQuality = async (city: string): Promise<AirQualityData> => {
  try {
    const response = await axios.get(`${BASE_URL}?city=${city}`, {
      headers: {
        'X-Api-Key': API_KEY,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching air quality data:', error);
    throw error;
  }
}; 