
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoIcon, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

export const FarmerTips = () => {
  return (
    <div className="space-y-6 mt-8">
      <h3 className="font-medium text-xl">Market Insights & Recommendations</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
              When Prices Are Rising
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              When market prices are on an upward trend, consider these strategies to maximize your returns:
            </p>
            <ul className="space-y-2 text-sm list-disc pl-5">
              <li>Hold your produce if storage facilities are available and affordable</li>
              <li>Consider staggered selling to benefit from potential further increases</li>
              <li>Monitor price trends closely before making final decisions</li>
              <li>Check prices at different markets as price increases may vary by location</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <TrendingDown className="h-5 w-5 mr-2 text-red-600" />
              When Prices Are Falling
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              During price downtrends, protect your investment with these approaches:
            </p>
            <ul className="space-y-2 text-sm list-disc pl-5">
              <li>Sell quickly if you anticipate continued decreases</li>
              <li>Consider selling to government procurement centers with minimum support prices</li>
              <li>Explore value-added processing options to increase product value</li>
              <li>Check alternate markets that might offer better prices</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <Alert className="bg-blue-50 border-blue-200">
        <InfoIcon className="h-4 w-4 text-blue-800" />
        <AlertTitle>Storage Considerations</AlertTitle>
        <AlertDescription className="text-sm">
          Always factor in storage costs when deciding to hold produce. For every month of storage, 
          you should expect at least a 5-8% price increase to justify the costs and risks.
        </AlertDescription>
      </Alert>
      
      <Alert className="bg-yellow-50 border-yellow-200">
        <AlertCircle className="h-4 w-4 text-yellow-800" />
        <AlertTitle>Market Information Resources</AlertTitle>
        <AlertDescription className="text-sm">
          Stay informed through our price alerts, the "e-NAM" (National Agriculture Market) platform, 
          and local agricultural extension services in West Bengal. Accurate and timely information 
          is key to making profitable selling decisions.
        </AlertDescription>
      </Alert>
    </div>
  );
};
