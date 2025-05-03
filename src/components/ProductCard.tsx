'use client';

import Image from 'next/image';
import { Product } from '@/data/products';
import GeneratedImage from './GeneratedImage';

interface ProductCardProps {
  product: Product;
  whatsappNumber: string;
}

export default function ProductCard({ product, whatsappNumber }: ProductCardProps) {
  // Verifica se o produto é novo
  const isNew = product.category === 'Novidades' || product.category === 'Cropped';

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Olá! Estou interessado no produto "${product.name}" (${product.category}) por ${product.price}. Gostaria de mais informações.`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  // Calcula o preço anterior para o desconto
  const originalPrice = `R$ ${(parseFloat(product.price.replace("R$", "").replace(/\s/g, "").replace(",", ".")) * 1.3).toFixed(2).replace(".", ",")}`;
  
  return (
    <div 
      data-category={product.category}
      className="bg-white rounded-sm border border-gray-200 hover:border-gray-300 rounded hover:shadow-sm transition-all duration-300 overflow-hidden relative group"
    >
      {/* Tag de desconto no estilo Netshoes atualizado */}
      <div className="absolute top-0 right-0 z-10">
        <div className="bg-black text-white px-2 py-1 text-xs font-bold">
          30% OFF
        </div>
      </div>
      
      {/* Tag de novidade (estilo Netshoes refinado) */}
      {isNew && (
        <div className="absolute top-0 left-0 z-10">
          <div className="bg-black text-white px-2 py-1 text-xs font-medium">
            Lançamento
          </div>
        </div>
      )}
      
      <div className="relative aspect-square overflow-hidden p-2">
        {product.imageUrl ? (
          <Image 
            src={product.imageUrl} 
            alt={product.name} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain transition-transform duration-300 group-hover:scale-105"
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
      
      <div className="p-3 bg-white border-t border-gray-100">
        {/* Marca (estilo Netshoes refinado) */}
        <p className="text-xs text-gray-500 mb-1 uppercase font-medium tracking-wide">{product.category}</p>
        
        {/* Nome do produto */}
        <h3 className="text-sm font-normal text-gray-800 mb-3 line-clamp-2 min-h-[40px] leading-tight">{product.name}</h3>
        
        {/* Avaliações (elemento comum na Netshoes) */}
        <div className="flex items-center mb-2">
          <div className="flex text-gray-600">
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
            <svg className="w-3 h-3 fill-current text-gray-300" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
          </div>
          <span className="text-xs text-gray-500 ml-1">(24)</span>
        </div>
        
        {/* Preços no estilo Netshoes refinado */}
        <div className="mb-3">
          <p className="text-xs line-through text-gray-500">{originalPrice}</p>
          <p className="text-lg font-bold text-gray-900">{product.price}</p>
          <p className="text-xs text-gray-600 font-medium">
            Em até 10x de {`R$ ${(parseFloat(product.price.replace("R$", "").replace(/\s/g, "").replace(",", ".")) / 10).toFixed(2).replace(".", ",")}`}
          </p>
        </div>
        
        {/* Botão de compra estilo Netshoes */}
        <button 
          onClick={handleWhatsAppClick}
          aria-label="Comprar pelo WhatsApp"
          className="w-full py-2.5 bg-black text-white hover:bg-gray-800 transition-colors duration-300 text-sm font-bold rounded-sm uppercase flex items-center justify-center"
        >
          <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4 2h16l-3 9H4a1 1 0 0 0 0 2h13v2H4a3 3 0 0 1 0-6h.33L3 5 2 2H0V0h3a1 1 0 0 1 1 1v1zm1 18a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm10 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
          </svg>
          COMPRAR
        </button>
        
        {/* Frete grátis tag (estilo Netshoes refinado) */}
        <div className="flex items-center mt-2">
          <span className="text-xs font-medium text-black border border-black px-1 py-0.5 mr-1 uppercase">FRETE GRÁTIS</span>
          <span className="text-xs text-gray-600">acima de R$99</span>
        </div>
      </div>
    </div>
  );
} 