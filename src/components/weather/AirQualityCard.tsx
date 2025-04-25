import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { getAirQuality } from "@/services/airQualityService";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

interface AirQualityCardProps {
  city: string;
}

const AirQualityCard = ({ city }: AirQualityCardProps) => {
  const { t } = useLanguage();
  const { data, isLoading, error } = useQuery({
    queryKey: ['airQuality', city],
    queryFn: () => getAirQuality(city),
  });

  const getAqiColor = (aqi: number) => {
    if (aqi <= 50) return 'bg-green-500';
    if (aqi <= 100) return 'bg-yellow-500';
    if (aqi <= 150) return 'bg-orange-500';
    if (aqi <= 200) return 'bg-red-500';
    if (aqi <= 300) return 'bg-purple-500';
    return 'bg-maroon-500';
  };

  const getAqiDescription = (aqi: number) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center h-32">
          <Loader2 className="h-8 w-8 animate-spin text-agri-primary" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center h-32 text-red-500">
          Error loading air quality data
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Air Quality in {city}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Overall AQI</span>
            <div className={`px-3 py-1 rounded-full text-white ${getAqiColor(data.overall_aqi)}`}>
              {data.overall_aqi}
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {getAqiDescription(data.overall_aqi)}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium">PM2.5</div>
              <div className="text-sm text-gray-600">
                {data.PM2_5.concentration} µg/m³
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">PM10</div>
              <div className="text-sm text-gray-600">
                {data.PM10.concentration} µg/m³
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">Ozone (O3)</div>
              <div className="text-sm text-gray-600">
                {data.O3.concentration} ppb
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">Nitrogen Dioxide (NO2)</div>
              <div className="text-sm text-gray-600">
                {data.NO2.concentration} ppb
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AirQualityCard; 