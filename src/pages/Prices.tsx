
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle } from "lucide-react";
import { PriceCard } from "@/components/prices/PriceCard";
import { RegionalPrices } from "@/components/prices/RegionalPrices";
import { FarmerTips } from "@/components/prices/FarmerTips";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

type CropPriceData = {
  current_price: number;
  previous_price: number;
  forecast_price: number;
  unit: string;
  region: string;
};

// Fallback data in case the database call fails
const FALLBACK_PRICES = {
  rice: {
    regions: {
      "Kolkata": 2250,
      "Howrah": 2230,
      "Siliguri": 2180,
      "Durgapur": 2210,
      "Asansol": 2190,
      "Bardhaman": 2240,
      "Malda": 2170,
      "Baharampur": 2200,
      "Jalpaiguri": 2160,
      "Kharagpur": 2220
    },
    current: 2205,
    previous: 2150,
    forecast: 2280
  },
  wheat: {
    regions: {
      "Kolkata": 1850,
      "Howrah": 1830,
      "Siliguri": 1790,
      "Durgapur": 1810,
      "Asansol": 1800,
      "Bardhaman": 1840,
      "Malda": 1780,
      "Baharampur": 1820,
      "Jalpaiguri": 1770,
      "Kharagpur": 1830
    },
    current: 1812,
    previous: 1780,
    forecast: 1870
  },
  potato: {
    regions: {
      "Kolkata": 1530,
      "Howrah": 1520,
      "Siliguri": 1480,
      "Durgapur": 1510,
      "Asansol": 1500,
      "Bardhaman": 1540,
      "Malda": 1470,
      "Baharampur": 1510,
      "Jalpaiguri": 1460,
      "Kharagpur": 1520
    },
    current: 1504,
    previous: 1460,
    forecast: 1560
  },
  onion: {
    regions: {
      "Kolkata": 2580,
      "Howrah": 2560,
      "Siliguri": 2510,
      "Durgapur": 2540,
      "Asansol": 2530,
      "Bardhaman": 2590,
      "Malda": 2500,
      "Baharampur": 2550,
      "Jalpaiguri": 2490,
      "Kharagpur": 2570
    },
    current: 2542,
    previous: 2380,
    forecast: 2620
  }
};

const Prices = () => {
  const [selectedCrop, setSelectedCrop] = useState("rice");

  // Call update-crop-prices edge function when component mounts
  useEffect(() => {
    const updatePrices = async () => {
      try {
        await supabase.functions.invoke('update-crop-prices');
        console.log("Price update triggered");
      } catch (error) {
        console.error("Error triggering price update:", error);
      }
    };
    
    updatePrices();
    
    // Update prices every 5 minutes
    const interval = setInterval(async () => {
      try {
        await supabase.functions.invoke('update-crop-prices');
      } catch (error) {
        console.error("Error updating crop prices:", error);
      }
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  const { data: cropPrices, isLoading, error } = useQuery({
    queryKey: ['cropPrices', selectedCrop],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('crop_prices')
          .select('*')
          .eq('crop_name', selectedCrop);

        if (error) throw error;
        
        // If no data is returned, update prices and try again
        if (!data || data.length === 0) {
          await supabase.functions.invoke('update-crop-prices');
          
          // Try fetching again after update
          const retryResponse = await supabase
            .from('crop_prices')
            .select('*')
            .eq('crop_name', selectedCrop);
            
          if (retryResponse.error) throw retryResponse.error;
          
          // If still no data, use fallback data
          if (!retryResponse.data || retryResponse.data.length === 0) {
            return [];
          }
          
          return retryResponse.data;
        }
        
        return data;
      } catch (error: any) {
        console.error("Error loading crop prices:", error.message);
        // Don't show error toast here as we'll fallback to static data
        return [];
      }
    },
    retry: 2,
    refetchOnWindowFocus: false,
  });

  // Calculate average prices and trends
  const calculateAverages = () => {
    // If no data from API, use fallback data
    if (!cropPrices || cropPrices.length === 0) {
      const fallbackData = FALLBACK_PRICES[selectedCrop as keyof typeof FALLBACK_PRICES];
      
      return {
        currentPrice: fallbackData.current,
        previousPrice: fallbackData.previous,
        forecastPrice: fallbackData.forecast,
        priceChange: ((fallbackData.current - fallbackData.previous) / fallbackData.previous) * 100,
        trend: fallbackData.current >= fallbackData.previous ? 'up' as const : 'down' as const
      };
    }

    // Ensure values are numbers to avoid NaN
    const validPrices = cropPrices.map(price => ({
      ...price,
      current_price: Number(price.current_price) || 0,
      previous_price: Number(price.previous_price) || 0,
      forecast_price: Number(price.forecast_price) || 0
    }));

    const currentPrice = Number((validPrices.reduce((sum, price) => 
      sum + price.current_price, 0) / validPrices.length).toFixed(2));
    
    const previousPrice = Number((validPrices.reduce((sum, price) => 
      sum + price.previous_price, 0) / validPrices.length).toFixed(2));
    
    const forecastPrice = Number((validPrices.reduce((sum, price) => 
      sum + price.forecast_price, 0) / validPrices.length).toFixed(2));

    // Calculate percentage change safely
    const priceChange = previousPrice ? 
      Number((((currentPrice - previousPrice) / previousPrice) * 100).toFixed(2)) : 0;
    
    // Fixed the type error by ensuring trend is always 'up' or 'down'
    const trend: 'up' | 'down' = priceChange >= 0 ? 'up' : 'down';

    return { currentPrice, previousPrice, forecastPrice, priceChange, trend };
  };

  // Transform data for regional comparison
  const getRegionData = () => {
    if (!cropPrices || cropPrices.length === 0) {
      // Use fallback data if no API data
      return FALLBACK_PRICES[selectedCrop as keyof typeof FALLBACK_PRICES].regions;
    }
    
    return Object.fromEntries(
      cropPrices.map(price => [price.region, Number(price.current_price) || 0])
    );
  };

  const { currentPrice, previousPrice, forecastPrice, priceChange, trend } = calculateAverages();
  const regions = getRegionData();

  return (
    <Layout>
      <div className="py-6 space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-agri-primary">
            Crop Price Trends
          </h1>
          <p className="text-muted-foreground">
            Current market prices and forecasts for major crops across West Bengal
          </p>
        </div>

        <Alert className="bg-agri-light border-agri-primary">
          <AlertCircle className="h-4 w-4 text-agri-primary" />
          <AlertTitle>Price Information</AlertTitle>
          <AlertDescription>
            Prices are updated daily from major agricultural markets (mandis) in West Bengal. Use this information to make informed decisions about when to sell your produce.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="rice" onValueChange={setSelectedCrop} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
            <TabsTrigger value="rice">Rice</TabsTrigger>
            <TabsTrigger value="wheat">Wheat</TabsTrigger>
            <TabsTrigger value="potato">Potato</TabsTrigger>
            <TabsTrigger value="onion">Onion</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedCrop} className="mt-0">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-agri-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <PriceCard
                  title="Current Price"
                  price={currentPrice}
                  unit="per quintal"
                  change={priceChange}
                  trend={trend}
                />
                <PriceCard
                  title="Price Forecast"
                  price={forecastPrice}
                  unit="per quintal"
                  subtitle="Expected price in next 7 days"
                />
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Market Advisory</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      {trend === "up"
                        ? "Prices are rising. If storage is available, consider holding your produce for 1-2 weeks."
                        : "Prices are falling. If you have market-ready produce, consider selling soon."}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            <h3 className="font-medium text-lg mt-6 mb-3">Regional Price Comparison</h3>
            <RegionalPrices 
              regions={regions}
              currentPrice={currentPrice}
            />

            <FarmerTips />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Prices;
