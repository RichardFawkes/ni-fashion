'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/data/products';
import GeneratedImage from './GeneratedImage';

interface ProductCardProps {
  product: Product;
  whatsappNumber: string;
}

export default function ProductCard({ product, whatsappNumber }: ProductCardProps) {
  // Função para formatar preço de string para exibição 
  const formatPrice = (priceStr: string) => {
    return priceStr; // Já está formatado como R$ X,XX no modelo de dados
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Olá! Estou interessado no produto "${product.name}" (${product.category}) por ${product.price}. Gostaria de mais informações.`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  // Verifica se o produto é novo (simplificado)
  const isNew = product.category === 'Novidades' || product.category === 'Cropped';

  return (
    <div 
      data-category={product.category}
      className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden relative group"
    >
      {/* Ribbon para produtos novos */}
      {isNew && (
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-black text-white px-2 py-1 text-xs font-accent uppercase tracking-wider">
            Novo
          </span>
        </div>
      )}
      
      <div className="relative aspect-square overflow-hidden">
        {product.imageUrl ? (
          <Image 
            src={product.imageUrl} 
            alt={product.name} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <GeneratedImage 
            text={product.name} 
            category={product.category} 
            height={300} 
            width={300} 
          />
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-1 font-heading font-light">{product.name}</h3>
            <p className="text-xs font-accent uppercase tracking-wider text-gray-500 mb-2">{product.category}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-black font-accent">{product.price}</p>
            {/* Calculamos um "preço anterior" fictício para mostrar desconto */}
            <p className="text-xs line-through text-gray-400 font-light">
              {`R$ ${(parseFloat(product.price.replace("R$", "").replace(/\s/g, "").replace(",", ".")) * 1.3).toFixed(2).replace(".", ",")}`}
            </p>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 font-light">{product.description}</p>
        
        <button 
          onClick={handleWhatsAppClick}
          aria-label="Comprar pelo WhatsApp"
          className="w-full py-2 bg-white border border-black text-black hover:bg-black hover:text-white transition-colors duration-300 text-sm font-accent uppercase tracking-wider flex items-center justify-center group-hover:border-black relative"
        >
          <span>Comprar</span>
          <svg 
            className="ml-2 w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
} 