import axios from 'axios';

interface ApiSkip {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}

export const fetchSkips = async (postcode: string, area: string) => {
  try {
    const response = await axios.get<ApiSkip[]>(
      `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${postcode}&area=${area}`
    );
    
    return response.data.map(apiSkip => ({
      id: apiSkip.id,
      name: `${apiSkip.size} Yard Skip`,
      description: `${apiSkip.size} yard skip with ${apiSkip.hire_period_days} days hire period. ${apiSkip.allowed_on_road ? 'Can be placed on road.' : 'Cannot be placed on road.'} ${apiSkip.allows_heavy_waste ? 'Suitable for heavy waste.' : 'Not suitable for heavy waste.'}`,
      price: apiSkip.price_before_vat * (1 + apiSkip.vat / 100), 
      size: `${apiSkip.size} Yard`,
      weight_limit: apiSkip.allows_heavy_waste ? 8000 : 6000, 
      coverage_radius: 10 
    }));
  } catch (error) {
    throw new Error('Failed to fetch skips');
  }
};
