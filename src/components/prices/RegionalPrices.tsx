
import { Card, CardContent } from "@/components/ui/card";

interface RegionalPricesProps {
  regions: Record<string, number>;
  currentPrice: number;
}

export const RegionalPrices = ({ regions, currentPrice }: RegionalPricesProps) => {
  // Ensure there are at least some regions even if data is missing
  const hasRegions = Object.keys(regions).length > 0;
  
  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-agri-light">
                <th className="text-left p-3 border-b">Region</th>
                <th className="text-right p-3 border-b">Price (₹)</th>
                <th className="text-right p-3 border-b">Difference</th>
              </tr>
            </thead>
            <tbody>
              {hasRegions ? (
                Object.entries(regions).map(([region, price]) => {
                  // Use default values if data is missing or invalid
                  const safePrice = isNaN(Number(price)) ? 0 : Number(price);
                  const safeCurrent = isNaN(Number(currentPrice)) ? 0 : Number(currentPrice);
                  // Calculate the difference between regional price and current average price
                  const difference = safePrice - safeCurrent;
                  
                  return (
                    <tr key={region} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-3 text-left">{region}</td>
                      <td className="p-3 text-right">₹{safePrice.toFixed(2)}</td>
                      <td className="p-3 text-right">
                        <span className={difference > 0 ? "text-green-600" : difference < 0 ? "text-red-600" : ""}>
                          {difference > 0 ? "+" : ""}{difference.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-muted-foreground">
                    No regional data available. Prices will appear here once data is loaded.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
