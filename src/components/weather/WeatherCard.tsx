import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { getWeatherByCity, WeatherData } from "@/services/weatherService";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

interface WeatherCardProps {
  defaultCity?: string;
}

const cities = [
  { name: "Kolkata", value: "Kolkata,IN" },
  { name: "Delhi", value: "Delhi,IN" },
  { name: "Mumbai", value: "Mumbai,IN" },
  { name: "Chennai", value: "Chennai,IN" },
  { name: "Bangalore", value: "Bangalore,IN" },
];

const WeatherCard = ({ defaultCity = "Kolkata,IN" }: WeatherCardProps) => {
  const { t } = useLanguage();
  const [selectedCity, setSelectedCity] = useState(defaultCity);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['weather', selectedCity],
    queryFn: () => getWeatherByCity(selectedCity),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
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
          Error loading weather data
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  const weather = data as WeatherData;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Weather Information
        </CardTitle>
        <Select value={selectedCity} onValueChange={handleCityChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select city" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city.value} value={city.value}>
                {city.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">
              {Math.round(weather.main.temp)}°C
            </span>
            <div className="flex items-center space-x-2">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                className="h-10 w-10"
              />
              <span className="text-sm capitalize">
                {weather.weather[0].description}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium">Feels Like</div>
              <div className="text-sm text-gray-600">
                {Math.round(weather.main.feels_like)}°C
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">Humidity</div>
              <div className="text-sm text-gray-600">
                {weather.main.humidity}%
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">Wind Speed</div>
              <div className="text-sm text-gray-600">
                {weather.wind.speed} m/s
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">Pressure</div>
              <div className="text-sm text-gray-600">
                {weather.main.pressure} hPa
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard; 