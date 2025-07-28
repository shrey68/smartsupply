// Enhanced data generation and processing for SmartSupply
// Simulates realistic retail inventory scenarios with multiple complexity factors

export interface SalesRecord {
  id: string;
  productId: string;
  productName: string;
  category: string;
  store: string;
  date: string;
  quantity: number;
  unitPrice: number;
  totalSales: number;
  seasonalityFactor: number;
  promotionActive: boolean;
  weatherImpact?: number;
}

export interface ProductMaster {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  leadTime: number;
  supplier: string;
  seasonalityPattern: 'high' | 'medium' | 'low';
  volatility: 'stable' | 'moderate' | 'high';
  lifecycle: 'introduction' | 'growth' | 'maturity' | 'decline';
}

export interface StoreProfile {
  id: string;
  name: string;
  location: string;
  size: 'small' | 'medium' | 'large';
  customerDemographics: 'urban' | 'suburban' | 'rural';
  avgFootTraffic: number;
}

export interface KPIData {
  totalRevenue: number;
  inventoryValue: number;
  forecastAccuracy: number;
  activeProducts: number;
  turnoverRate: number;
  stockoutRate: number;
  avgLeadTime: number;
  carryingCost: number;
  serviceLevel: number;
}

export interface ForecastResult {
  productId: string;
  date: string;
  predicted: number;
  confidenceLower: number;
  confidenceUpper: number;
  modelUsed: 'prophet' | 'arima' | 'xgboost' | 'neural';
  accuracy: number;
}

// Enhanced product catalog with realistic retail items
const productMaster: ProductMaster[] = [
  // Electronics - High value, moderate seasonality
  {
    id: 'ELEC-001',
    name: 'iPhone 15 Pro',
    category: 'Electronics',
    basePrice: 999,
    leadTime: 7,
    supplier: 'Apple Inc.',
    seasonalityPattern: 'medium',
    volatility: 'moderate',
    lifecycle: 'growth'
  },
  {
    id: 'ELEC-002',
    name: 'Samsung Galaxy S24',
    category: 'Electronics',
    basePrice: 899,
    leadTime: 10,
    supplier: 'Samsung Electronics',
    seasonalityPattern: 'medium',
    volatility: 'moderate',
    lifecycle: 'maturity'
  },
  {
    id: 'ELEC-003',
    name: 'AirPods Pro',
    category: 'Electronics',
    basePrice: 249,
    leadTime: 5,
    supplier: 'Apple Inc.',
    seasonalityPattern: 'high',
    volatility: 'stable',
    lifecycle: 'maturity'
  },
  {
    id: 'ELEC-004',
    name: 'Samsung 55" QLED TV',
    category: 'Electronics',
    basePrice: 1299,
    leadTime: 14,
    supplier: 'Samsung Electronics',
    seasonalityPattern: 'high',
    volatility: 'moderate',
    lifecycle: 'maturity'
  },

  // Sports & Fitness - Seasonal patterns
  {
    id: 'SPRT-001',
    name: 'Nike Air Max 270',
    category: 'Sports',
    basePrice: 150,
    leadTime: 21,
    supplier: 'Nike Direct',
    seasonalityPattern: 'medium',
    volatility: 'stable',
    lifecycle: 'maturity'
  },
  {
    id: 'SPRT-002',
    name: 'Adidas UltraBoost',
    category: 'Sports',
    basePrice: 180,
    leadTime: 18,
    supplier: 'Adidas AG',
    seasonalityPattern: 'low',
    volatility: 'stable',
    lifecycle: 'maturity'
  },
  {
    id: 'SPRT-003',
    name: 'Yoga Mat Premium',
    category: 'Sports',
    basePrice: 45,
    leadTime: 14,
    supplier: 'FitnessCorp',
    seasonalityPattern: 'medium',
    volatility: 'moderate',
    lifecycle: 'growth'
  },

  // Clothing - High seasonality
  {
    id: 'CLTH-001',
    name: 'Levi\'s 501 Jeans',
    category: 'Clothing',
    basePrice: 80,
    leadTime: 28,
    supplier: 'Levi Strauss & Co.',
    seasonalityPattern: 'low',
    volatility: 'stable',
    lifecycle: 'maturity'
  },
  {
    id: 'CLTH-002',
    name: 'Winter Parka',
    category: 'Clothing',
    basePrice: 200,
    leadTime: 45,
    supplier: 'OutdoorGear Co.',
    seasonalityPattern: 'high',
    volatility: 'high',
    lifecycle: 'maturity'
  },
  {
    id: 'CLTH-003',
    name: 'Summer T-Shirt',
    category: 'Clothing',
    basePrice: 25,
    leadTime: 21,
    supplier: 'BasicWear Ltd.',
    seasonalityPattern: 'high',
    volatility: 'moderate',
    lifecycle: 'maturity'
  },

  // Home & Garden - Seasonal and weather dependent
  {
    id: 'HOME-001',
    name: 'KitchenAid Stand Mixer',
    category: 'Home & Garden',
    basePrice: 300,
    leadTime: 21,
    supplier: 'KitchenAid',
    seasonalityPattern: 'high',
    volatility: 'stable',
    lifecycle: 'maturity'
  },
  {
    id: 'HOME-002',
    name: 'Garden Hose 50ft',
    category: 'Home & Garden',
    basePrice: 35,
    leadTime: 14,
    supplier: 'GardenMax',
    seasonalityPattern: 'high',
    volatility: 'high',
    lifecycle: 'maturity'
  },
  {
    id: 'HOME-003',
    name: 'Indoor Plant Collection',
    category: 'Home & Garden',
    basePrice: 60,
    leadTime: 7,
    supplier: 'GreenThumb Nursery',
    seasonalityPattern: 'medium',
    volatility: 'moderate',
    lifecycle: 'growth'
  }
];

const storeProfiles: StoreProfile[] = [
  {
    id: 'downtown',
    name: 'Downtown Flagship',
    location: 'City Center',
    size: 'large',
    customerDemographics: 'urban',
    avgFootTraffic: 500
  },
  {
    id: 'mall',
    name: 'Westfield Mall',
    location: 'Shopping Center',
    size: 'medium',
    customerDemographics: 'suburban',
    avgFootTraffic: 800
  },
  {
    id: 'suburban',
    name: 'Suburban Outlet',
    location: 'Residential Area',
    size: 'small',
    customerDemographics: 'suburban',
    avgFootTraffic: 200
  }
];

// Advanced data generation with realistic patterns
export const generateAdvancedSalesData = (days: number = 365): SalesRecord[] => {
  const salesData: SalesRecord[] = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  for (let dayIndex = 0; dayIndex < days; dayIndex++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + dayIndex);
    
    // Day of week factor (weekends higher for some categories)
    const dayOfWeek = currentDate.getDay();
    const weekendFactor = (dayOfWeek === 0 || dayOfWeek === 6) ? 1.3 : 1.0;
    
    // Seasonal factors based on month
    const month = currentDate.getMonth();
    const seasonalFactors = calculateSeasonalFactors(month);
    
    // Generate weather impact (simplified)
    const weatherImpact = generateWeatherImpact(currentDate);
    
    // Promotion calendar (simplified - some products on promotion 10% of time)
    const promotionChance = 0.1;
    
    // Generate sales for each store
    storeProfiles.forEach(store => {
      // Store-specific traffic multiplier
      const trafficMultiplier = store.avgFootTraffic / 400; // Normalize around 400
      
      // Daily sales volume varies by store size and traffic
      const baseDailySales = store.size === 'large' ? 25 : store.size === 'medium' ? 15 : 8;
      const adjustedDailySales = Math.floor(baseDailySales * trafficMultiplier * weekendFactor);
      
      // Generate individual sale transactions
      for (let saleIndex = 0; saleIndex < adjustedDailySales; saleIndex++) {
        // Select random product with category preferences by store demographics
        const product = selectProductByDemographics(store.customerDemographics);
        if (!product) continue;
        
        // Calculate all factors affecting this sale
        const seasonalFactor = seasonalFactors[product.category] || 1.0;
        const promotionActive = Math.random() < promotionChance;
        const promotionDiscount = promotionActive ? 0.85 : 1.0;
        const volatilityFactor = calculateVolatilityFactor(product.volatility);
        
        // Final price calculation
        const adjustedPrice = product.basePrice * 
          seasonalFactor * 
          promotionDiscount * 
          volatilityFactor * 
          (1 + (weatherImpact * getWeatherSensitivity(product.category)));
        
        // Quantity typically 1-3, higher for promotions
        const quantity = promotionActive ? 
          Math.floor(Math.random() * 3) + 1 :
          Math.floor(Math.random() * 2) + 1;
        
        const record: SalesRecord = {
          id: `${dayIndex}-${store.id}-${saleIndex}-${Math.random().toString(36).substr(2, 6)}`,
          productId: product.id,
          productName: product.name,
          category: product.category,
          store: store.id,
          date: currentDate.toISOString().split('T')[0],
          quantity,
          unitPrice: Math.round(adjustedPrice * 100) / 100,
          totalSales: Math.round(adjustedPrice * quantity * 100) / 100,
          seasonalityFactor: seasonalFactor,
          promotionActive,
          weatherImpact
        };
        
        salesData.push(record);
      }
    });
  }
  
  return salesData;
};

// Helper functions for realistic data generation
function calculateSeasonalFactors(month: number): Record<string, number> {
  const factors: Record<string, number> = {
    'Electronics': 1.0,
    'Sports': 1.0,
    'Clothing': 1.0,
    'Home & Garden': 1.0,
    'Books': 1.0
  };
  
  // Electronics peak in November-December (holiday season)
  if (month >= 10 || month === 0) {
    factors['Electronics'] = 1.4;
  }
  
  // Sports equipment peaks in spring (March-May) and fall (September-October)
  if ((month >= 2 && month <= 4) || (month >= 8 && month <= 9)) {
    factors['Sports'] = 1.3;
  }
  
  // Clothing seasonal patterns
  if (month >= 10 || month <= 1) { // Winter
    factors['Clothing'] = 1.2; // Winter clothing
  } else if (month >= 5 && month <= 7) { // Summer
    factors['Clothing'] = 1.1; // Summer clothing
  }
  
  // Home & Garden peaks in spring/summer
  if (month >= 3 && month <= 8) {
    factors['Home & Garden'] = 1.3;
  }
  
  return factors;
}

function generateWeatherImpact(date: Date): number {
  // Simplified weather impact: random between -0.1 and 0.1
  return (Math.random() - 0.5) * 0.2;
}

function getWeatherSensitivity(category: string): number {
  const sensitivities: Record<string, number> = {
    'Electronics': 0.1,
    'Sports': 0.3,
    'Clothing': 0.4,
    'Home & Garden': 0.5,
    'Books': 0.05
  };
  return sensitivities[category] || 0.1;
}

function selectProductByDemographics(demographics: string): ProductMaster | null {
  // Different demographics prefer different products
  let weightedProducts = [...productMaster];
  
  if (demographics === 'urban') {
    // Urban customers prefer electronics and trendy items
    weightedProducts = productMaster.filter(p => 
      p.category === 'Electronics' || p.lifecycle === 'growth'
    );
  } else if (demographics === 'suburban') {
    // More balanced mix, family-oriented
    // No specific filtering, use all products
  } else if (demographics === 'rural') {
    // Prefer practical items, less electronics
    weightedProducts = productMaster.filter(p => 
      p.category !== 'Electronics' || p.name.includes('TV')
    );
  }
  
  if (weightedProducts.length === 0) {
    weightedProducts = productMaster;
  }
  
  return weightedProducts[Math.floor(Math.random() * weightedProducts.length)];
}

function calculateVolatilityFactor(volatility: string): number {
  switch (volatility) {
    case 'stable': return 0.95 + Math.random() * 0.1; // 95-105%
    case 'moderate': return 0.85 + Math.random() * 0.3; // 85-115%
    case 'high': return 0.7 + Math.random() * 0.6; // 70-130%
    default: return 1.0;
  }
}

// Enhanced KPI calculations with more sophisticated metrics
export const calculateAdvancedKPIs = (salesData: SalesRecord[]): KPIData => {
  if (salesData.length === 0) {
    return {
      totalRevenue: 0,
      inventoryValue: 0,
      forecastAccuracy: 0,
      activeProducts: 0,
      turnoverRate: 0,
      stockoutRate: 0,
      avgLeadTime: 0,
      carryingCost: 0,
      serviceLevel: 0
    };
  }

  const totalRevenue = salesData.reduce((sum, record) => sum + record.totalSales, 0);
  const uniqueProducts = new Set(salesData.map(record => record.productId));
  
  // Calculate average lead time from product master
  const soldProducts = Array.from(uniqueProducts);
  const avgLeadTime = soldProducts.reduce((sum, productId) => {
    const product = productMaster.find(p => p.id === productId);
    return sum + (product?.leadTime || 14);
  }, 0) / soldProducts.length;
  
  // Simulate more realistic metrics with some variance
  const baseAccuracy = 94.2;
  const accuracyVariance = (Math.random() - 0.5) * 3; // ±1.5%
  
  const baseTurnover = 8.5;
  const turnoverVariance = (Math.random() - 0.5) * 1; // ±0.5
  
  const baseStockoutRate = 2.3;
  const stockoutVariance = (Math.random() - 0.5) * 0.8; // ±0.4%
  
  return {
    totalRevenue: Math.round(totalRevenue),
    inventoryValue: Math.round(totalRevenue * 0.65), // 65% of sales as inventory
    forecastAccuracy: Math.round((baseAccuracy + accuracyVariance) * 10) / 10,
    activeProducts: uniqueProducts.size,
    turnoverRate: Math.round((baseTurnover + turnoverVariance) * 10) / 10,
    stockoutRate: Math.round((baseStockoutRate + stockoutVariance) * 10) / 10,
    avgLeadTime: Math.round(avgLeadTime * 10) / 10,
    carryingCost: Math.round((18.5 + (Math.random() - 0.5) * 2) * 10) / 10,
    serviceLevel: Math.round((97.8 + (Math.random() - 0.5) * 1) * 10) / 10
  };
};

// Advanced forecasting simulation with multiple models
export const generateForecastData = (
  productId: string, 
  days: number = 30,
  model: 'prophet' | 'arima' | 'xgboost' | 'neural' = 'xgboost'
): ForecastResult[] => {
  const product = productMaster.find(p => p.id === productId);
  if (!product) return [];
  
  const forecast: ForecastResult[] = [];
  
  // Base demand varies by product category and lifecycle
  const baseDemand = calculateBaseDemand(product);
  
  // Model-specific accuracy and patterns
  const modelParams = getModelParameters(model, product);
  
  for (let i = 0; i < days; i++) {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + i + 1);
    
    // Trend component
    const trendFactor = calculateTrendFactor(product.lifecycle, i, days);
    
    // Seasonal component
    const seasonalFactor = calculateForecastSeasonality(futureDate, product);
    
    // Model-specific noise and patterns
    const modelAdjustment = calculateModelAdjustment(model, i, modelParams);
    
    // Calculate predicted demand
    const predicted = Math.max(0, 
      baseDemand * trendFactor * seasonalFactor * modelAdjustment
    );
    
    // Confidence intervals based on model accuracy
    const confidenceWidth = predicted * (1 - modelParams.accuracy / 100) * 2;
    const confidenceLower = Math.max(0, predicted - confidenceWidth / 2);
    const confidenceUpper = predicted + confidenceWidth / 2;
    
    forecast.push({
      productId,
      date: futureDate.toISOString().split('T')[0],
      predicted: Math.round(predicted),
      confidenceLower: Math.round(confidenceLower),
      confidenceUpper: Math.round(confidenceUpper),
      modelUsed: model,
      accuracy: modelParams.accuracy
    });
  }
  
  return forecast;
};

function calculateBaseDemand(product: ProductMaster): number {
  // Base demand varies by category and price point
  const categoryDemand: Record<string, number> = {
    'Electronics': 15,
    'Sports': 25,
    'Clothing': 30,
    'Home & Garden': 12,
    'Books': 8
  };
  
  const baseDemand = categoryDemand[product.category] || 15;
  
  // Adjust for price point (higher price = lower volume)
  const priceAdjustment = Math.max(0.3, 1 - (product.basePrice / 1000) * 0.5);
  
  return baseDemand * priceAdjustment;
}

function getModelParameters(model: string, product: ProductMaster) {
  const baseParams = {
    prophet: { accuracy: 94.2, smoothness: 0.8, seasonality: 1.0 },
    xgboost: { accuracy: 95.1, smoothness: 0.6, seasonality: 0.9 },
    arima: { accuracy: 91.8, smoothness: 0.9, seasonality: 0.7 },
    neural: { accuracy: 92.7, smoothness: 0.7, seasonality: 0.8 }
  };
  
  const params = baseParams[model as keyof typeof baseParams] || baseParams.xgboost;
  
  // Adjust based on product characteristics
  if (product.volatility === 'high') {
    params.accuracy -= 2;
    params.smoothness -= 0.1;
  } else if (product.volatility === 'stable') {
    params.accuracy += 1;
    params.smoothness += 0.1;
  }
  
  return params;
}

function calculateTrendFactor(lifecycle: string, dayIndex: number, totalDays: number): number {
  const progress = dayIndex / totalDays;
  
  switch (lifecycle) {
    case 'introduction':
      return 1 + progress * 0.5; // Growing demand
    case 'growth':
      return 1 + progress * 0.3; // Moderate growth
    case 'maturity':
      return 1 + (Math.random() - 0.5) * 0.1; // Stable with small variations
    case 'decline':
      return 1 - progress * 0.2; // Declining demand
    default:
      return 1;
  }
}

function calculateForecastSeasonality(date: Date, product: ProductMaster): number {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  const seasonalCycle = Math.sin((dayOfYear / 365) * 2 * Math.PI);
  
  const seasonalityStrength = product.seasonalityPattern === 'high' ? 0.3 :
                             product.seasonalityPattern === 'medium' ? 0.15 : 0.05;
  
  return 1 + seasonalCycle * seasonalityStrength;
}

function calculateModelAdjustment(model: string, dayIndex: number, params: any): number {
  const baseNoise = (Math.random() - 0.5) * 0.2;
  
  switch (model) {
    case 'prophet':
      // Prophet is good at capturing trends and seasonality
      return 1 + baseNoise * (1 - params.smoothness);
    case 'xgboost':
      // XGBoost captures complex patterns well
      return 1 + baseNoise * 0.8 + Math.sin(dayIndex / 7) * 0.1; // Weekly patterns
    case 'arima':
      // ARIMA is smooth but can miss rapid changes
      return 1 + baseNoise * params.smoothness;
    case 'neural':
      // Neural networks can be volatile but capture complex patterns
      return 1 + baseNoise + Math.sin(dayIndex / 3) * 0.05; // Complex patterns
    default:
      return 1 + baseNoise;
  }
}

// Export product master and store profiles for use in components
export { productMaster, storeProfiles };

// Legacy compatibility - keep existing functions but use enhanced data
export const generateSalesData = (days: number = 90): SalesRecord[] => {
  return generateAdvancedSalesData(days);
};

export const calculateKPIs = (salesData: SalesRecord[]): KPIData => {
  return calculateAdvancedKPIs(salesData);
};