import { useState, useEffect } from 'react';
import { fetchSkips } from '../../utils/api';

interface Skip {
  id: number;
  name: string;
  description: string;
  price: number;
  size: string;
  weight_limit: number;
  coverage_radius: number;
}

const useSkipsData = () => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchSkips('NR32', 'Lowestoft');
        setSkips(data);
        setLoading(false);
      } catch (err) {
        setError('Échec du chargement des données');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { skips, loading, error };
};

export default useSkipsData;
