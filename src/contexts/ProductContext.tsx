import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { products as staticProducts } from '../stripe-config';

interface Product {
  product_id: string;
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

      // Use static products from config for now
      const productList: Product[] = Object.entries(staticProducts).map(([key, product]) => ({
        product_id: `prod_${key}`,
        price_id: product.priceId,
        name: product.name,
        description: product.description,
        mode: product.mode,
        price: product.price,
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