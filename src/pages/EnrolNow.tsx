import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Product {
  product_id: string;
  price_id: string;
  name: string;
  description: string | null;
  mode: 'payment' | 'subscription';
}

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType>({
  products: [],
  loading: true,
  error: null,
  refetch: async () => {},
});

export const useProducts = () => useContext(ProductContext);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('active_products')
        .select('*')
        .order('created_at', { ascending: true });

      if (fetchError) {
        throw fetchError;
      }

      setProducts(data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();

    // Subscribe to product changes
    const channel = supabase.channel('product_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'stripe_products' 
      }, () => {
        fetchProducts();
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, error, refetch: fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
export default ProductProvider;