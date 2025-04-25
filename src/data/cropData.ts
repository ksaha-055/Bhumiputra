
// Crop recommendation data with yield predictions and suitability factors

export type CropRecommendation = {
  crop: string;
  variety: string;
  suitability: number; // 0-100 scale
  yieldEstimate: string;
  waterRequirement: string;
  fertilizers: string;
  growingPeriod: string;
  challenges?: string[];
};

export type RegionalCropRecommendations = {
  [region: string]: {
    [soilType: string]: {
      [season: string]: {
        primary: CropRecommendation[];
        alternatives: CropRecommendation[];
      }
    }
  }
};

// Determine current season based on the month
export const getCurrentSeason = (): string => {
  const month = new Date().getMonth();
  
  if (month >= 3 && month <= 5) return "Summer";
  if (month >= 6 && month <= 9) return "Monsoon";
  if (month >= 10 && month <= 11) return "Post-Monsoon";
  return "Winter"; // December, January, February
};

// Get challenges based on season, region, and crop
export const getCropChallenges = (crop: string, region: string, season: string): string[] => {
  const challenges: Record<string, Record<string, string[]>> = {
    "Rice": {
      "Summer": ["Heat stress may reduce yield", "Higher water requirement", "Increased pest pressure"],
      "Monsoon": ["Potential flooding risk", "Fungal diseases in humid conditions", "Lodging during heavy rains"],
      "Post-Monsoon": ["Water availability may be limited", "Cold stress during grain filling stage"],
      "Winter": ["Cold damage risk in northern regions", "Limited growth due to low temperatures"]
    },
    "Wheat": {
      "Summer": ["Not suitable for summer cultivation in most regions"],
      "Monsoon": ["High humidity causes fungal diseases", "Waterlogging damages roots"],
      "Post-Monsoon": ["Ideal growing season", "Watch for aphid infestations"],
      "Winter": ["Potential frost damage in flowering stage", "Terminal heat stress during grain filling"]
    },
    "Maize": {
      "Summer": ["Heat stress during pollination", "Higher irrigation requirements", "Increased pest pressure"],
      "Monsoon": ["Waterlogging in heavy rainfall areas", "Higher disease pressure", "Lodging risk"],
      "Post-Monsoon": ["Good growing season", "Moderate pest pressure"],
      "Winter": ["Cold stress in northern regions", "Slower growth and development"]
    }
  };
  
  // If specific crop challenges aren't available, return generic ones
  if (!challenges[crop]) {
    return [
      `Weather fluctuations common in ${season} may affect growth`,
      `Monitor for pests and diseases prevalent in ${region} during ${season}`,
      "Maintain optimal irrigation based on rainfall patterns"
    ];
  }
  
  return challenges[crop][season] || [
    `Weather fluctuations common in ${season} may affect growth`,
    `Monitor for pests and diseases prevalent in ${region} during ${season}`,
    "Maintain optimal irrigation based on rainfall patterns"
  ];
};

// Comprehensive crop recommendations database
export const cropRecommendationsData: RegionalCropRecommendations = {
  "West Bengal": {
    "alluvial": {
      "Summer": {
        primary: [
          { 
            crop: "Jute", 
            variety: "JRO-524", 
            suitability: 92,
            yieldEstimate: "25-30 quintals/hectare",
            waterRequirement: "High",
            fertilizers: "NPK 60:30:30 kg/ha",
            growingPeriod: "100-120 days"
          },
          { 
            crop: "Aus Rice", 
            variety: "MTU-7029", 
            suitability: 90,
            yieldEstimate: "35-40 quintals/hectare",
            waterRequirement: "High",
            fertilizers: "NPK 80:40:40 kg/ha",
            growingPeriod: "90-100 days"
          },
          { 
            crop: "Vegetables", 
            variety: "Local varieties", 
            suitability: 85,
            yieldEstimate: "Varies by crop",
            waterRequirement: "Medium-High",
            fertilizers: "NPK 100:50:50 kg/ha + organic manure",
            growingPeriod: "60-90 days"
          }
        ],
        alternatives: [
          { 
            crop: "Sesame", 
            variety: "Rama", 
            suitability: 80,
            yieldEstimate: "6-8 quintals/hectare",
            waterRequirement: "Low",
            fertilizers: "NPK 30:15:15 kg/ha",
            growingPeriod: "80-90 days"
          },
          { 
            crop: "Mung Bean", 
            variety: "PDM-84-139", 
            suitability: 78,
            yieldEstimate: "8-10 quintals/hectare",
            waterRequirement: "Low",
            fertilizers: "NPK 20:40:20 kg/ha",
            growingPeriod: "65-70 days"
          }
        ]
      },
      "Monsoon": {
        primary: [
          { 
            crop: "Rice", 
            variety: "Swarna (MTU-7029)", 
            suitability: 95,
            yieldEstimate: "50-55 quintals/hectare",
            waterRequirement: "High",
            fertilizers: "NPK 100:50:50 kg/ha",
            growingPeriod: "135-145 days"
          },
          { 
            crop: "Jute", 
            variety: "JRO-524", 
            suitability: 90,
            yieldEstimate: "28-32 quintals/hectare",
            waterRequirement: "High",
            fertilizers: "NPK 60:30:30 kg/ha",
            growingPeriod: "100-120 days"
          },
          { 
            crop: "Turmeric", 
            variety: "Rajendra Sonia", 
            suitability: 85,
            yieldEstimate: "200-250 quintals/hectare",
            waterRequirement: "Medium",
            fertilizers: "NPK 60:50:120 kg/ha + FYM",
            growingPeriod: "210-240 days"
          }
        ],
        alternatives: [
          { 
            crop: "Black Gram", 
            variety: "T-9", 
            suitability: 82,
            yieldEstimate: "8-10 quintals/hectare",
            waterRequirement: "Low-Medium",
            fertilizers: "NPK 20:40:20 kg/ha",
            growingPeriod: "70-80 days"
          },
          { 
            crop: "Pigeon Pea", 
            variety: "UPAS-120", 
            suitability: 80,
            yieldEstimate: "15-18 quintals/hectare",
            waterRequirement: "Low-Medium",
            fertilizers: "NPK 20:50:20 kg/ha",
            growingPeriod: "150-180 days"
          }
        ]
      },
      "Winter": {
        primary: [
          { 
            crop: "Potato", 
            variety: "Kufri Jyoti", 
            suitability: 94,
            yieldEstimate: "250-300 quintals/hectare",
            waterRequirement: "Medium",
            fertilizers: "NPK 150:80:100 kg/ha",
            growingPeriod: "90-110 days"
          },
          { 
            crop: "Wheat", 
            variety: "HD-2967", 
            suitability: 92,
            yieldEstimate: "45-50 quintals/hectare",
            waterRequirement: "Medium",
            fertilizers: "NPK 120:60:40 kg/ha",
            growingPeriod: "120-135 days"
          },
          { 
            crop: "Mustard", 
            variety: "Pusa Bold", 
            suitability: 88,
            yieldEstimate: "12-15 quintals/hectare",
            waterRequirement: "Low",
            fertilizers: "NPK 60:40:40 kg/ha",
            growingPeriod: "110-120 days"
          }
        ],
        alternatives: [
          { 
            crop: "Lentil", 
            variety: "PL-406", 
            suitability: 85,
            yieldEstimate: "10-12 quintals/hectare",
            waterRequirement: "Low",
            fertilizers: "NPK 20:40:20 kg/ha",
            growingPeriod: "120-130 days"
          },
          { 
            crop: "Vegetables", 
            variety: "Seasonal varieties", 
            suitability: 90,
            yieldEstimate: "Varies by crop",
            waterRequirement: "Medium",
            fertilizers: "NPK 100:60:60 kg/ha + organic manure",
            growingPeriod: "60-120 days"
          }
        ]
      }
    }
  },
  "Punjab": {
    "alluvial": {
      "Summer": {
        primary: [
          { 
            crop: "Cotton", 
            variety: "Bt Cotton hybrids", 
            suitability: 90,
            yieldEstimate: "18-22 quintals/hectare",
            waterRequirement: "Medium-High",
            fertilizers: "NPK 150:60:60 kg/ha",
            growingPeriod: "150-180 days"
          },
          { 
            crop: "Maize", 
            variety: "PMH-1", 
            suitability: 85,
            yieldEstimate: "35-40 quintals/hectare",
            waterRequirement: "Medium",
            fertilizers: "NPK 120:60:40 kg/ha",
            growingPeriod: "90-100 days"
          },
          { 
            crop: "Moong Bean", 
            variety: "SML-668", 
            suitability: 80,
            yieldEstimate: "8-10 quintals/hectare",
            waterRequirement: "Low",
            fertilizers: "NPK 20:40:20 kg/ha",
            growingPeriod: "60-70 days"
          }
        ],
        alternatives: [
          { 
            crop: "Groundnut", 
            variety: "TAG-24", 
            suitability: 75,
            yieldEstimate: "20-25 quintals/hectare",
            waterRequirement: "Medium",
            fertilizers: "NPK 25:50:75 kg/ha",
            growingPeriod: "110-120 days"
          },
          { 
            crop: "Vegetables", 
            variety: "Summer varieties", 
            suitability: 78,
            yieldEstimate: "Varies by crop",
            waterRequirement: "High",
            fertilizers: "NPK 100:50:50 kg/ha + organic manure",
            growingPeriod: "60-90 days"
          }
        ]
      },
      "Monsoon": {
        primary: [
          { 
            crop: "Rice", 
            variety: "PR-126", 
            suitability: 95,
            yieldEstimate: "60-65 quintals/hectare",
            waterRequirement: "High",
            fertilizers: "NPK 120:60:30 kg/ha",
            growingPeriod: "125-130 days"
          },
          { 
            crop: "Cotton", 
            variety: "Bt Cotton hybrids", 
            suitability: 88,
            yieldEstimate: "20-25 quintals/hectare",
            waterRequirement: "Medium",
            fertilizers: "NPK 150:60:60 kg/ha",
            growingPeriod: "150-180 days"
          },
          { 
            crop: "Maize", 
            variety: "PMH-1", 
            suitability: 85,
            yieldEstimate: "40-45 quintals/hectare",
            waterRequirement: "Medium",
            fertilizers: "NPK 120:60:40 kg/ha",
            growingPeriod: "90-100 days"
          }
        ],
        alternatives: [
          { 
            crop: "Arhar/Pigeon Pea", 
            variety: "PAU-881", 
            suitability: 78,
            yieldEstimate: "15-18 quintals/hectare",
            waterRequirement: "Low",
            fertilizers: "NPK 20:50:20 kg/ha",
            growingPeriod: "160-180 days"
          },
          { 
            crop: "Sesbania", 
            variety: "Local", 
            suitability: 75,
            yieldEstimate: "Green manure crop",
            waterRequirement: "Medium",
            fertilizers: "Not required",
            growingPeriod: "45-60 days"
          }
        ]
      },
      "Winter": {
        primary: [
          { 
            crop: "Wheat", 
            variety: "HD-3086", 
            suitability: 96,
            yieldEstimate: "55-60 quintals/hectare",
            waterRequirement: "Medium",
            fertilizers: "NPK 150:75:50 kg/ha",
            growingPeriod: "140-150 days"
          },
          { 
            crop: "Potato", 
            variety: "Kufri Pukhraj", 
            suitability: 92,
            yieldEstimate: "300-350 quintals/hectare",
            waterRequirement: "Medium",
            fertilizers: "NPK 180:80:120 kg/ha",
            growingPeriod: "90-110 days"
          },
          { 
            crop: "Mustard", 
            variety: "RLC-1", 
            suitability: 88,
            yieldEstimate: "15-18 quintals/hectare",
            waterRequirement: "Low",
            fertilizers: "NPK 60:30:30 kg/ha",
            growingPeriod: "120-130 days"
          }
        ],
        alternatives: [
          { 
            crop: "Chickpea", 
            variety: "PBG-7", 
            suitability: 82,
            yieldEstimate: "18-20 quintals/hectare",
            waterRequirement: "Low",
            fertilizers: "NPK 20:40:20 kg/ha",
            growingPeriod: "120-130 days"
          },
          { 
            crop: "Barley", 
            variety: "DWRUB-52", 
            suitability: 85,
            yieldEstimate: "40-45 quintals/hectare",
            waterRequirement: "Low",
            fertilizers: "NPK 60:30:20 kg/ha",
            growingPeriod: "120-130 days"
          }
        ]
      }
    }
  }
};

// Additional regions and soil types follow the same pattern but are omitted for brevity
// In a real implementation, we would have complete data for all regions

// Function to get crop recommendations based on region, soil type, and season
export const getCropRecommendations = (
  region: string,
  soilType: string,
  season?: string
): { primary: CropRecommendation[]; alternatives: CropRecommendation[] } => {
  const currentSeason = season || getCurrentSeason();
  
  // Fallback data if the exact combination isn't found
  const fallbackRecommendations = {
    primary: [
      { 
        crop: "Rice", 
        variety: "Local variety", 
        suitability: 85,
        yieldEstimate: "40-45 quintals/hectare",
        waterRequirement: "High",
        fertilizers: "NPK 100:50:50 kg/ha",
        growingPeriod: "120-140 days"
      },
      { 
        crop: "Maize", 
        variety: "Hybrid variety", 
        suitability: 80,
        yieldEstimate: "35-40 quintals/hectare",
        waterRequirement: "Medium",
        fertilizers: "NPK 120:60:40 kg/ha",
        growingPeriod: "90-110 days"
      }
    ],
    alternatives: [
      { 
        crop: "Pulses", 
        variety: "Local variety", 
        suitability: 75,
        yieldEstimate: "10-15 quintals/hectare",
        waterRequirement: "Low",
        fertilizers: "NPK 20:40:20 kg/ha",
        growingPeriod: "90-120 days"
      }
    ]
  };
  
  try {
    // First try to get exact region, soil type, and season
    if (cropRecommendationsData[region]?.[soilType]?.[currentSeason]) {
      return cropRecommendationsData[region][soilType][currentSeason];
    }
    
    // If exact soil type not found, try to get recommendations for any soil type in the region
    if (cropRecommendationsData[region]) {
      const availableSoilTypes = Object.keys(cropRecommendationsData[region]);
      if (availableSoilTypes.length > 0) {
        const firstSoilType = availableSoilTypes[0];
        if (cropRecommendationsData[region][firstSoilType][currentSeason]) {
          return cropRecommendationsData[region][firstSoilType][currentSeason];
        }
      }
    }
    
    // If no match found, return fallback data
    return fallbackRecommendations;
  } catch (error) {
    console.error("Error getting crop recommendations:", error);
    return fallbackRecommendations;
  }
};

// Function to calculate expected yield based on inputs
export const calculateYield = (
  crop: string, 
  variety: string, 
  area: number, 
  soilType: string, 
  region: string
): {
  expectedYield: number;
  yieldRange: { min: number; max: number };
  confidence: number;
  factors: { name: string; impact: string; recommendation: string }[];
} => {
  // Find the crop in recommendations
  const season = getCurrentSeason();
  const recommendations = getCropRecommendations(region, soilType, season);
  
  let baseYield = 0;
  let yieldRange = { min: 0, max: 0 };
  
  // Try to find the specific crop and variety
  const cropData = [...recommendations.primary, ...recommendations.alternatives]
    .find(c => c.crop.toLowerCase() === crop.toLowerCase() && c.variety.toLowerCase() === variety.toLowerCase());
  
  if (cropData) {
    // Parse yield estimate (format: "XX-YY quintals/hectare")
    const yieldMatch = cropData.yieldEstimate.match(/(\d+)-(\d+)/);
    if (yieldMatch) {
      const minYield = parseFloat(yieldMatch[1]);
      const maxYield = parseFloat(yieldMatch[2]);
      baseYield = (minYield + maxYield) / 2 * area;
      yieldRange = {
        min: minYield * area * 0.9, // 10% below expected minimum
        max: maxYield * area * 1.1  // 10% above expected maximum
      };
    }
  } else {
    // Fallback yields if crop not found
    baseYield = 40 * area; // Assumption: 40 quintals/hectare average yield
    yieldRange = {
      min: 35 * area,
      max: 45 * area
    };
  }
  
  // Add some variation based on current season and region
  const challenges = getCropChallenges(crop, region, season);
  
  // Generate factors that affect yield
  const factors = [
    { 
      name: "Soil Quality", 
      impact: "High", 
      recommendation: "Add organic matter to improve soil structure and nutrient availability"
    },
    { 
      name: "Seasonal Weather", 
      impact: "Medium", 
      recommendation: season === "Monsoon" ? 
        "Ensure proper drainage during heavy rains" : 
        season === "Summer" ? 
        "Provide adequate irrigation to counter high temperatures" :
        "Protect crops from potential frost damage"
    },
    { 
      name: "Crop Management", 
      impact: "Medium", 
      recommendation: "Follow recommended spacing and timely application of fertilizers"
    }
  ];
  
  return {
    expectedYield: Math.round(baseYield * 100) / 100,
    yieldRange: {
      min: Math.round(yieldRange.min * 100) / 100,
      max: Math.round(yieldRange.max * 100) / 100
    },
    confidence: 85, // Fixed confidence level for demo
    factors: factors
  };
};
