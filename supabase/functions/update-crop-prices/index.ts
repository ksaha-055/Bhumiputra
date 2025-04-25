
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.31.0";

// Create a Supabase client with the Auth context of the function
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
// Use service role key to bypass RLS
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const WEST_BENGAL_REGIONS = [
  "Kolkata",
  "Howrah",
  "Siliguri",
  "Durgapur",
  "Asansol",
  "Bardhaman",
  "Malda",
  "Baharampur",
  "Jalpaiguri",
  "Kharagpur"
];

const CROPS = ["rice", "wheat", "potato", "onion"];

// Function to generate random prices within a range
function getRandomPrice(min: number, max: number): number {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

// Function to adjust existing price with a small variance
function adjustPrice(basePrice: number, maxChangePercent: number = 5): number {
  const changePercent = (Math.random() * maxChangePercent * 2) - maxChangePercent; // -5% to +5%
  return Number((basePrice * (1 + changePercent / 100)).toFixed(2));
}

async function updateCropPrices() {
  // Initial reference prices for different crops (per quintal in INR)
  const basePrices = {
    "rice": 2200,
    "wheat": 1800,
    "potato": 1500,
    "onion": 2500
  };

  try {
    for (const crop of CROPS) {
      // Get existing prices to update them with slight variations
      const { data: existingPrices, error: fetchError } = await supabase
        .from("crop_prices")
        .select("*")
        .eq("crop_name", crop);

      if (fetchError) {
        console.error(`Error fetching prices for ${crop}: ${fetchError.message}`);
        continue;
      }

      // If prices exist, update them with variations; otherwise create new ones
      if (existingPrices && existingPrices.length > 0) {
        for (const record of existingPrices) {
          // Ensure current_price is a number before adjusting
          const currentPriceBase = typeof record.current_price === 'number' ? 
            record.current_price : 
            basePrices[crop as keyof typeof basePrices];
          
          const currentPrice = adjustPrice(currentPriceBase);
          const forecastPrice = adjustPrice(currentPrice, 8); // Slightly higher variance for forecast
          
          const { error: updateError } = await supabase
            .from("crop_prices")
            .update({
              previous_price: record.current_price,
              current_price: currentPrice,
              forecast_price: forecastPrice,
              updated_at: new Date().toISOString()
            })
            .eq("id", record.id);

          if (updateError) {
            console.error(`Error updating price for ${crop} in ${record.region}: ${updateError.message}`);
          }
        }
      } else {
        // Create new price records for each region
        for (const region of WEST_BENGAL_REGIONS) {
          // Add some regional variance to base prices
          const basePrice = basePrices[crop as keyof typeof basePrices];
          const regionalVariance = getRandomPrice(-100, 150); // -₹100 to +₹150 regional difference
          const currentPrice = basePrice + regionalVariance;
          
          // Calculate previous price (slightly different from current)
          const previousPrice = adjustPrice(currentPrice, 3);
          
          // Calculate forecast price
          const forecastPrice = adjustPrice(currentPrice, 10);
          
          const { error: insertError } = await supabase
            .from("crop_prices")
            .insert({
              crop_name: crop,
              region: region,
              current_price: currentPrice,
              previous_price: previousPrice,
              forecast_price: forecastPrice,
              unit: "per quintal"
            });

          if (insertError) {
            console.error(`Error inserting price for ${crop} in ${region}: ${insertError.message}`);
          }
        }
      }
    }
    
    return { success: true, message: "Crop prices updated successfully" };
  } catch (error) {
    console.error(`Unexpected error updating crop prices: ${error.message}`);
    return { success: false, error: error.message };
  }
}

serve(async (req) => {
  try {
    const result = await updateCropPrices();
    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
