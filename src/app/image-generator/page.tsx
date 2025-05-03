'use client';

import { useState } from 'react';
import { products } from '@/data/products';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import GeneratedImage from '@/components/GeneratedImage';

export default function ImageGenerator() {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const croppedProducts = products.filter(product => product.category === 'Cropped');
  const whatsappNumber = "5511999999999"; // Replace with your actual WhatsApp number

  const handleDownload = (imageUrl: string, productName: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${productName.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-light text-gray-900 mb-4">Catálogo de Imagens de Croppeds</h1>
            <p className="text-gray-600 mb-6">
              Visualize e faça download das imagens de croppeds para uso no seu catálogo feminista. 
              Todas as imagens seguem nossas diretrizes de representatividade e diversidade.
            </p>
            <Link 
              href="/public/images/cropped/README.md" 
              target="_blank"
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-md inline-flex items-center transition-colors duration-300 shadow-md"
            >
              Ver Diretrizes de Imagens
            </Link>
          </div>
          
          {/* Seletor de Produtos */}
          <div className="mb-10">
            <h2 className="text-xl font-medium mb-4">Produtos Disponíveis</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {croppedProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className={`p-3 rounded-lg text-left text-sm transition-all ${
                    selectedProduct.id === product.id 
                      ? 'bg-purple-100 border border-purple-300' 
                      : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <p className="font-medium truncate">{product.name}</p>
                  <p className="text-gray-500 text-xs mt-1">R$ {product.price}</p>
                </button>
              ))}
            </div>
          </div>
          
          {/* Exibição de Imagens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Imagem Real */}
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <h3 className="text-lg font-medium mb-3">Imagem Real do Produto</h3>
              <div className="aspect-[4/5] relative mb-4 bg-white rounded overflow-hidden">
                <Image
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/placeholder.jpg";
                  }}
                />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">{selectedProduct.name}</p>
                <button
                  onClick={() => handleDownload(selectedProduct.imageUrl, selectedProduct.name)}
                  className="bg-purple-600 hover:bg-purple-700 text-white py-1 px-3 text-sm rounded transition-colors duration-300"
                >
                  Download
                </button>
              </div>
            </div>
            
            {/* Imagem Gerada */}
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <h3 className="text-lg font-medium mb-3">Imagem Gerada (Placeholder)</h3>
              <div className="aspect-[4/5] relative mb-4 bg-white rounded overflow-hidden flex items-center justify-center">
                <div className="w-full h-full">
                  <GeneratedImage
                    text={selectedProduct.name}
                    category={selectedProduct.category}
                    width={400}
                    height={500}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Versão gerada</p>
                <p className="text-xs text-gray-500">Gerada automaticamente</p>
              </div>
            </div>
          </div>
          
          {/* Informações do Produto */}
          <div className="mt-8 p-6 bg-purple-50 rounded-lg">
            <h3 className="text-xl font-medium mb-4">Detalhes do Produto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              <div>
                <p className="text-sm text-gray-500 mb-1">Nome do Produto</p>
                <p className="font-medium">{selectedProduct.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Categoria</p>
                <p className="font-medium">{selectedProduct.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Preço</p>
                <p className="font-medium">{selectedProduct.price}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Cores Disponíveis</p>
                <div className="flex flex-wrap gap-1">
                  {selectedProduct.colors.map((color) => (
                    <span key={color} className="text-xs bg-white px-2 py-1 rounded border border-gray-200">
                      {color}
                    </span>
                  ))}
                </div>
              </div>
              <div className="col-span-1 md:col-span-2">
                <p className="text-sm text-gray-500 mb-1">Descrição</p>
                <p className="text-sm">{selectedProduct.description}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <Link 
                href={`https://wa.me/${whatsappNumber}?text=Olá! Tenho interesse no produto: ${selectedProduct.name} - Preço: ${selectedProduct.price}`}
                target="_blank"
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md inline-flex items-center transition-colors duration-300"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Comprar pelo WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer whatsappNumber={whatsappNumber} />
    </div>
  );
} 