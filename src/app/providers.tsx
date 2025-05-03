'use client';

import { useEffect } from 'react';
import { products } from '../data/products';
import { initializeProducts } from './services/productService';
import { initializeImages } from './services/imageService';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    const init = async () => {
      try {
        // Inicializar produtos
        await initializeProducts(products);
        
        // Inicializar imagens
        await initializeImages();
        
        console.log('Dados inicializados com sucesso');
      } catch (error) {
        console.error('Erro ao inicializar dados:', error);
      }
    };
    
    init();
  }, []);

  return <>{children}</>;
} 