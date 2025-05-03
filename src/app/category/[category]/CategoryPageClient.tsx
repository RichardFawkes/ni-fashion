"use client";
import { useEffect, useState } from 'react';
import { Product } from '../../../data/products';
import * as productService from '../../services/productService';
import ProductCard from '../../../components/ProductCard';

interface CategoryPageClientProps {
  params: {
    category: string;
  };
}

export default function CategoryPageClient({ params }: CategoryPageClientProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = () => {
      const categoryProducts = productService.getProductsByCategory(params.category);
      setProducts(categoryProducts);
      setLoading(false);
    };

    loadProducts();
  }, [params.category]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Categoria: {params.category}</h1>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              whatsappNumber="+5511999999999"
            />
          ))}
        </div>
      </main>
    </div>
  );
} 