import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Product {
  id: string;
  price_id: string;
  name: string;
  description: string | null;
  mode: string | null;
  price?: string;
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

      // Fetch products from Supabase (synced from Stripe via webhook)
      const { data, error: fetchError } = await supabase
        .from('active_products')
        .select('*')
        .order('name', { ascending: true });

      if (fetchError) {
        throw fetchError;
      }

      const productList: Product[] = (data || []).map(product => ({
        id: product.product_id,
        price_id: product.price_id || '',
        name: product.name,
        description: product.description,
        mode: product.mode,
        price: product.price_display || 'Contact for pricing',
      }));
      setProducts(productList);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, error, refetch: fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};