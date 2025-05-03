'use client';

import { useState, useEffect } from 'react';
import { products, Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

// Definição de tipos para a página e propriedades
interface CategoryPageProps {
  params: {
    category: string;
  };
}

// Função para gerar metadata para SEO
const getMetadata = (title: string, description: string) => {
  return {
    title,
    description
  };
};

export default function CategoryPage({ params }: CategoryPageProps) {
  const [mounted, setMounted] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceFilter, setPriceFilter] = useState('all');
  const [whatsappNumber, setWhatsappNumber] = useState('5511999999999');

  useEffect(() => {
    // Decodificar a categoria da URL
    const decodedCategory = decodeURIComponent(params.category);
    setCategoryName(decodedCategory);

    // Filtrar produtos pela categoria
    const filteredByCategory = products.filter(product => 
      product.category === decodedCategory || 
      (decodedCategory === 'Todos' && product)
    );
    setCategoryProducts(filteredByCategory);
    setFilteredProducts(filteredByCategory);

    // Carregar número do WhatsApp do localStorage
    if (typeof window !== 'undefined') {
      const storedNumber = localStorage.getItem('whatsappNumber');
      if (storedNumber) {
        setWhatsappNumber(storedNumber);
      }
    }

    setMounted(true);
  }, [params.category]);

  useEffect(() => {
    // Aplicar filtro de preço
    if (priceFilter === 'all') {
      setFilteredProducts(categoryProducts);
    } else if (priceFilter === 'low') {
      setFilteredProducts([...categoryProducts].sort((a, b) => {
        const priceA = parseFloat(a.price.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
        const priceB = parseFloat(b.price.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
        return priceA - priceB;
      }));
    } else if (priceFilter === 'high') {
      setFilteredProducts([...categoryProducts].sort((a, b) => {
        const priceA = parseFloat(a.price.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
        const priceB = parseFloat(b.price.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
        return priceB - priceA;
      }));
    }
  }, [priceFilter, categoryProducts]);

  // Função para alterar o filtro de preço
  const handlePriceFilterChange = (filter: string) => {
    setPriceFilter(filter);
  };

  // Metadata para SEO
  const metadata = getMetadata(`${categoryName} - Coleção`, `Confira nossa seleção exclusiva de ${categoryName.toLowerCase()}. Entrega rápida e segura. Compre online!`);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Caminho de navegação (breadcrumb) */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-700">{categoryName}</span>
        </div>

        {/* Título da página */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-light">{categoryName}</h1>
          <p className="text-gray-600 mt-2">
            {filteredProducts.length} produtos encontrados
          </p>
        </div>

        {/* Filtros e Ordenação */}
        <div className="flex flex-wrap items-center justify-between mb-6 bg-gray-50 p-4 rounded-md">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-sm text-gray-700 mr-2">Ordenar por:</span>
            <button 
              onClick={() => handlePriceFilterChange('all')}
              className={`text-sm px-3 py-1 mr-2 rounded-full ${priceFilter === 'all' ? 'bg-black text-white' : 'bg-white text-gray-700 border'}`}
            >
              Mais Relevantes
            </button>
            <button 
              onClick={() => handlePriceFilterChange('low')}
              className={`text-sm px-3 py-1 mr-2 rounded-full ${priceFilter === 'low' ? 'bg-black text-white' : 'bg-white text-gray-700 border'}`}
            >
              Menor Preço
            </button>
            <button 
              onClick={() => handlePriceFilterChange('high')}
              className={`text-sm px-3 py-1 rounded-full ${priceFilter === 'high' ? 'bg-black text-white' : 'bg-white text-gray-700 border'}`}
            >
              Maior Preço
            </button>
          </div>
          
          <div className="w-full md:w-auto">
            <select 
              className="w-full md:w-auto p-2 border border-gray-300 rounded-md text-sm" 
              defaultValue=""
            >
              <option value="" disabled>Filtrar por tamanho</option>
              <option value="P">P</option>
              <option value="M">M</option>
              <option value="G">G</option>
              <option value="GG">GG</option>
            </select>
          </div>
        </div>

        {/* Lista de produtos */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                whatsappNumber={whatsappNumber}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-light mb-4">Nenhum produto encontrado</h2>
            <p className="text-gray-600 mb-8">Não encontramos produtos nesta categoria.</p>
            <Link 
              href="/" 
              className="inline-block bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors duration-300 rounded-sm"
            >
              Voltar para a Home
            </Link>
          </div>
        )}
        
        {/* Paginação - Versão básica para exemplo */}
        {filteredProducts.length > 0 && (
          <div className="flex justify-center mt-12">
            <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Anterior</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" aria-current="page" className="relative inline-flex items-center px-4 py-2 border border-black bg-black text-sm font-medium text-white">1</a>
              <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">2</a>
              <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">3</a>
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">...</span>
              <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">8</a>
              <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Próxima</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </a>
            </nav>
          </div>
        )}
      </main>
      <Footer whatsappNumber={whatsappNumber} />
    </>
  );
} 