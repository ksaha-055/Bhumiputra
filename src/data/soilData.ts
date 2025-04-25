
// Soil profile data for different regions in India
// Based on agricultural soil surveys and regional soil characteristics

export type SoilProfile = {
  region: string;
  soilTypes: {
    [type: string]: {
      description: string;
      ph: { min: number; max: number; typical: number };
      nitrogen: { min: number; max: number; typical: number };
      phosphorus: { min: number; max: number; typical: number };
      potassium: { min: number; max: number; typical: number };
      organicMatter: { min: number; max: number; typical: number };
      crops: string[];
    };
  };
};

// Comprehensive soil profile data for major agricultural regions in India
export const regionalSoilProfiles: Record<string, SoilProfile> = {
  "West Bengal": {
    region: "West Bengal",
    soilTypes: {
      "alluvial": {
        description: "Rich alluvial soil in the Gangetic plains, highly fertile and suitable for a wide range of crops.",
        ph: { min: 6.0, max: 7.5, typical: 6.8 },
        nitrogen: { min: 280, max: 420, typical: 340 },
        phosphorus: { min: 12, max: 25, typical: 18 },
        potassium: { min: 140, max: 280, typical: 210 },
        organicMatter: { min: 0.8, max: 1.5, typical: 1.2 },
        crops: ["Rice", "Jute", "Tea", "Vegetables", "Pulses", "Oilseeds"]
      },
      "red and yellow": {
        description: "Red and yellow soils found in western parts, moderately fertile with good drainage.",
        ph: { min: 5.5, max: 6.8, typical: 6.2 },
        nitrogen: { min: 200, max: 350, typical: 280 },
        phosphorus: { min: 8, max: 18, typical: 12 },
        potassium: { min: 120, max: 220, typical: 180 },
        organicMatter: { min: 0.6, max: 1.2, typical: 0.9 },
        crops: ["Rice", "Wheat", "Pulses", "Oilseeds", "Vegetables"]
      }
    }
  },
  "Punjab": {
    region: "Punjab",
    soilTypes: {
      "alluvial": {
        description: "Fertile alluvial soil with excellent water-holding capacity, ideal for intensive agriculture.",
        ph: { min: 7.0, max: 8.2, typical: 7.8 },
        nitrogen: { min: 300, max: 450, typical: 380 },
        phosphorus: { min: 15, max: 28, typical: 22 },
        potassium: { min: 160, max: 300, typical: 240 },
        organicMatter: { min: 0.7, max: 1.4, typical: 1.0 },
        crops: ["Wheat", "Rice", "Cotton", "Maize", "Sugarcane", "Vegetables"]
      },
      "calcareous": {
        description: "Calcareous soils with high lime content found in some areas, moderately fertile.",
        ph: { min: 7.5, max: 8.5, typical: 8.0 },
        nitrogen: { min: 250, max: 380, typical: 320 },
        phosphorus: { min: 10, max: 22, typical: 16 },
        potassium: { min: 150, max: 280, typical: 220 },
        organicMatter: { min: 0.5, max: 1.0, typical: 0.8 },
        crops: ["Wheat", "Barley", "Chickpea", "Mustard", "Lentil"]
      }
    }
  },
  "Uttar Pradesh": {
    region: "Uttar Pradesh",
    soilTypes: {
      "alluvial": {
        description: "Fertile alluvial soils in the Gangetic plains, excellent for cultivation of various crops.",
        ph: { min: 6.5, max: 7.8, typical: 7.2 },
        nitrogen: { min: 280, max: 420, typical: 350 },
        phosphorus: { min: 12, max: 24, typical: 18 },
        potassium: { min: 150, max: 270, typical: 220 },
        organicMatter: { min: 0.8, max: 1.5, typical: 1.1 },
        crops: ["Rice", "Wheat", "Sugarcane", "Pulses", "Vegetables", "Potato"]
      },
      "usar": {
        description: "Alkaline usar soils with poor drainage and fertility, requires reclamation.",
        ph: { min: 8.0, max: 9.5, typical: 8.8 },
        nitrogen: { min: 150, max: 280, typical: 220 },
        phosphorus: { min: 5, max: 15, typical: 10 },
        potassium: { min: 100, max: 220, typical: 160 },
        organicMatter: { min: 0.3, max: 0.8, typical: 0.5 },
        crops: ["Salt-tolerant varieties of Rice", "Barley", "Berseem", "Dhaincha"]
      }
    }
  },
  "Maharashtra": {
    region: "Maharashtra",
    soilTypes: {
      "black cotton": {
        description: "Deep black cotton soils (regur) with high clay content, excellent water retention but drainage issues.",
        ph: { min: 7.2, max: 8.5, typical: 7.8 },
        nitrogen: { min: 220, max: 380, typical: 300 },
        phosphorus: { min: 10, max: 22, typical: 16 },
        potassium: { min: 200, max: 350, typical: 280 },
        organicMatter: { min: 0.6, max: 1.2, typical: 0.9 },
        crops: ["Cotton", "Jowar", "Pulses", "Sugarcane", "Wheat", "Citrus"]
      },
      "red and yellow": {
        description: "Red and yellow soils in eastern regions, moderate fertility with good drainage.",
        ph: { min: 6.0, max: 7.2, typical: 6.5 },
        nitrogen: { min: 180, max: 320, typical: 250 },
        phosphorus: { min: 8, max: 18, typical: 12 },
        potassium: { min: 140, max: 260, typical: 200 },
        organicMatter: { min: 0.5, max: 1.0, typical: 0.7 },
        crops: ["Jowar", "Bajra", "Pulses", "Groundnut", "Millet"]
      }
    }
  },
  "Karnataka": {
    region: "Karnataka",
    soilTypes: {
      "red": {
        description: "Red soils derived from granite and gneiss, moderately fertile with good drainage.",
        ph: { min: 6.0, max: 7.2, typical: 6.6 },
        nitrogen: { min: 200, max: 350, typical: 280 },
        phosphorus: { min: 8, max: 20, typical: 14 },
        potassium: { min: 150, max: 270, typical: 210 },
        organicMatter: { min: 0.5, max: 1.1, typical: 0.8 },
        crops: ["Ragi", "Maize", "Pulses", "Oilseeds", "Millet"]
      },
      "black cotton": {
        description: "Black cotton soils in northern parts, fertile but challenging to work with due to high clay content.",
        ph: { min: 7.0, max: 8.2, typical: 7.5 },
        nitrogen: { min: 220, max: 380, typical: 310 },
        phosphorus: { min: 10, max: 22, typical: 16 },
        potassium: { min: 180, max: 320, typical: 260 },
        organicMatter: { min: 0.6, max: 1.2, typical: 0.9 },
        crops: ["Cotton", "Jowar", "Sugarcane", "Pulses", "Oilseeds"]
      },
      "laterite": {
        description: "Laterite soils in coastal and hilly regions, acidic and leached of nutrients.",
        ph: { min: 4.5, max: 6.0, typical: 5.5 },
        nitrogen: { min: 150, max: 280, typical: 220 },
        phosphorus: { min: 5, max: 15, typical: 10 },
        potassium: { min: 120, max: 220, typical: 170 },
        organicMatter: { min: 0.4, max: 1.0, typical: 0.7 },
        crops: ["Rice", "Coconut", "Cashew", "Pepper", "Cardamom", "Areca nut"]
      }
    }
  }
};

// Get soil profile for a specific region
export const getSoilProfile = (region: string): SoilProfile => {
  return regionalSoilProfiles[region] || regionalSoilProfiles["West Bengal"];
};

// Get predominant soil type for a region
export const getPredominantSoilType = (region: string): string => {
  const profile = getSoilProfile(region);
  const soilTypes = Object.keys(profile.soilTypes);
  // Return the first soil type as predominant (in real app, would be based on area coverage)
  return soilTypes[0];
};

// Get typical soil parameters for a specific region and soil type
export const getTypicalSoilParameters = (region: string, soilType?: string) => {
  const profile = getSoilProfile(region);
  const soilTypeToUse = soilType || getPredominantSoilType(region);
  
  if (!profile.soilTypes[soilTypeToUse]) {
    // Fallback to the first soil type if the requested type doesn't exist
    const firstSoilType = Object.keys(profile.soilTypes)[0];
    return {
      ph: profile.soilTypes[firstSoilType].ph.typical,
      nitrogen: profile.soilTypes[firstSoilType].nitrogen.typical,
      phosphorus: profile.soilTypes[firstSoilType].phosphorus.typical,
      potassium: profile.soilTypes[firstSoilType].potassium.typical,
      organicMatter: profile.soilTypes[firstSoilType].organicMatter.typical
    };
  }
  
  return {
    ph: profile.soilTypes[soilTypeToUse].ph.typical,
    nitrogen: profile.soilTypes[soilTypeToUse].nitrogen.typical,
    phosphorus: profile.soilTypes[soilTypeToUse].phosphorus.typical,
    potassium: profile.soilTypes[soilTypeToUse].potassium.typical,
    organicMatter: profile.soilTypes[soilTypeToUse].organicMatter.typical
  };
};
