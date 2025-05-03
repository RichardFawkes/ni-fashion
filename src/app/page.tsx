"use client";
import { useState, useEffect } from 'react';
import { Product, products as defaultProducts, categories } from '../data/products';
import * as productService from './services/productService';
import Link from 'next/link';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategoryFilter from '@/components/CategoryFilter';
import ProductCard from '@/components/ProductCard';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import CroppedBanner from '@/components/CroppedBanner';

export default function Home() {
  
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [products, setProducts] = useState<Product[]>([]);
  
  // Número de WhatsApp - poderia ser configurado na área administrativa posteriormente
  const whatsappNumber = "5511999999999"; // Format: country code + number
  
  useEffect(() => {
    // Inicializa os produtos no localStorage se não existirem
    productService.initializeProducts(defaultProducts);
    
    // Carrega os produtos do localStorage
    const storedProducts = productService.getAllProducts();
    setProducts(storedProducts.length > 0 ? storedProducts : defaultProducts);
  }, []);

  // Filtra os produtos com base na categoria selecionada
  const filteredProducts = selectedCategory === 'Todos'
    ? products
    : products.filter(product => product.category === selectedCategory);

  // Separe os produtos em destaque (cropped) e outros
  const croppedProducts = products.filter(product => product.category === 'Cropped');
  const otherProducts = selectedCategory === 'Todos' 
    ? products.filter(product => product.category !== 'Cropped') 
    : filteredProducts;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      
      {/* Admin Link */}
      <div className="w-full flex justify-end container mx-auto px-4 mt-4">
        <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-700">
          Área Administrativa
        </Link>
      </div>
      
      {/* Banner de Croppeds - exibe só quando mostrando todos os produtos ou categoria cropped */}
      {(selectedCategory === 'Todos' || selectedCategory === 'Cropped') && (
        <CroppedBanner />
      )}
      
      <main id="catalog" className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-light text-center mb-4 serif-heading">Nosso Catálogo</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
          Descubra nossa coleção exclusiva com peças elegantes e modernas para todas as ocasiões. 
          Selecionamos cuidadosamente cada item para garantir qualidade e estilo.
        </p>
        
        <CategoryFilter 
          categories={categories} 
          selectedCategory={selectedCategory} 
          onCategoryChange={setSelectedCategory} 
        />
        
        {/* Seção de croppeds em destaque */}
        {selectedCategory === 'Todos' && (
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium">Croppeds em Destaque</h3>
              <button 
                onClick={() => setSelectedCategory('Cropped')}
                className="text-sm text-black hover:text-gray-600 transition-colors border-b border-black pb-1"
              >
                Ver todos
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {croppedProducts.slice(0, 4).map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  whatsappNumber={whatsappNumber}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Seção principal de produtos */}
        {(selectedCategory !== 'Todos' || otherProducts.length > 0) && (
          <>
            {selectedCategory !== 'Todos' && (
              <h3 className="text-xl font-medium mb-6 serif-heading">{selectedCategory}</h3>
            )}
            {selectedCategory === 'Todos' && (
              <h3 className="text-xl font-medium mb-6 serif-heading">Outros Produtos</h3>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {otherProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  whatsappNumber={whatsappNumber}
                />
              ))}
            </div>
          </>
        )}
      </main>
      
      <CallToAction whatsappNumber={whatsappNumber} />
      <Footer whatsappNumber={whatsappNumber} />
    </div>
  );
}
