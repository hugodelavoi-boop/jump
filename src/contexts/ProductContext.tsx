import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { products as staticProducts } from '../stripe-config';

interface Product {
  id: string;
  price_id: string;
  name: string;
  description: string | null;
  mode: string | null;
  price_display?: string;
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
      
      console.log('🔄 Fetching products from Supabase...');
      console.log('🕐 Timestamp:', new Date().toISOString());

      // Check if Supabase is properly configured
      if (!supabase) {
        throw new Error('Supabase client not initialized');
      }

      // Fetch products from Supabase with comprehensive filtering
      const { data, error: fetchError } = await supabase
        .from('active_products')
        .select('*')
        .eq('active', true)
        .is('deleted_at', null)
        .not('price_id', 'is', null)
        .not('name', 'is', null)
        .order('name', { ascending: true });

      if (fetchError) {
        console.error('❌ Database error fetching products:', fetchError);
        throw new Error(`Database error: ${fetchError.message}`);
      }

      console.log('📊 Raw product data from database:', data);
      console.log('📈 Number of products found:', data?.length || 0);
      
      if (!data || data.length === 0) {
        console.warn('⚠️ No products found in database');
        setProducts([]);
        return;
      }
      
      // Log the last updated timestamps
      const timestamps = data.map(p => ({ name: p.name, updated_at: p.updated_at }));
      console.log('📅 Product update timestamps:', timestamps);
      
      const mostRecent = data.reduce((latest, current) => {
        return new Date(current.updated_at) > new Date(latest.updated_at) ? current : latest;
      });
      console.log(`🕐 Most recently updated product: ${mostRecent.name} at ${mostRecent.updated_at}`);

      // Validate and process products
      const productList: Product[] = data
        .filter(product => {
          // Additional validation
          if (!product.price_id || !product.name) {
            console.warn('⚠️ Skipping invalid product:', product);
            return false;
          }
          return true;
        })
        .map(product => ({
          id: product.product_id,
          price_id: product.price_id,
          name: product.name,
          description: product.description,
          mode: product.mode || 'payment',
          price_display: product.price_display,
        }));
      
      console.log('✅ Processed product list:', productList);
      setProducts(productList);
    } catch (err) {
      console.error('❌ Error fetching products:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch products';
      setError(errorMessage);
      
      // Fallback to static products on error
      console.log('🔄 Falling back to static products');
      const fallbackProducts: Product[] = Object.values(staticProducts).map(product => ({
        id: product.id,
        price_id: product.priceId,
        name: product.name,
        description: product.description,
        mode: product.mode,
        price_display: product.price_display,
      }));
      setProducts(fallbackProducts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    
    // If no products are loaded after initial fetch, use static products
    const fallbackTimer = setTimeout(() => {
      if (products.length === 0 && !loading) {
        console.log('🔄 No products loaded, using static fallback');
        const fallbackProducts: Product[] = Object.values(staticProducts).map(product => ({
          id: product.id,
          price_id: product.priceId,
          name: product.name,
          description: product.description,
          mode: product.mode,
          price_display: product.price_display,
        }));
        setProducts(fallbackProducts);
      }
    }, 3000);

    // Set up real-time subscription for product changes
    const channel = supabase
      .channel('product_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'stripe_products' 
        }, 
        (payload) => {
          console.log('🔄 Product change detected:', payload);
          fetchProducts();
        }
      )
      .subscribe();

    return () => {
      clearTimeout(fallbackTimer);
      channel.unsubscribe();
    };
  }, [products.length, loading]);

  return (
    <ProductContext.Provider value={{ products, loading, error, refetch: fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};