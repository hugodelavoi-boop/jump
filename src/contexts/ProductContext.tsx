import React, { createContext, useContext, useEffect, useState } from 'react';
import { stripeProducts as staticProducts } from '../stripe-config';

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

  // Convert static products to the expected format
  const convertStaticProducts = (): Product[] => {
    return staticProducts.map(product => ({
      id: product.productId,
      price_id: product.priceId,
      name: product.name,
      description: product.description,
      mode: product.mode,
      price_display: new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: product.currency,
      }).format(product.price),
    }));
  };

  useEffect(() => {
    console.log('🔄 ProductProvider: Using STATIC PRODUCTS ONLY');
    
    // Always use static products, never fetch from database
    const staticProductList = convertStaticProducts();
    
    console.log('✅ Static products loaded:', staticProductList);
    setProducts(staticProductList);
    setLoading(false);
    setError(null);
  }, []);

  const refetch = async () => {
    console.log('🔄 Refetch called - using static products');
    const staticProductList = convertStaticProducts();
    setProducts(staticProductList);
  };

  return (
    <ProductContext.Provider value={{ products, loading, error, refetch }}>
      {children}
    </ProductContext.Provider>
  );
};