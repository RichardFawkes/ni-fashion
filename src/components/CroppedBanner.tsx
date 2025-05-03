'use client';

import Link from 'next/link';
// Removendo a importação problemática
// import { FiArrowRight } from 'react-icons/fi';

export default function CroppedBanner() {
  return (
    <section className="bg-gray-100 py-16 relative overflow-hidden">
      {/* Fundo decorativo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1604689598793-b8bf1dc445a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Cabeçalho da seção */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <span className="h-px w-8 bg-green-500"></span>
            <span className="text-green-500 text-sm font-bold uppercase tracking-wider mx-3">Destaques</span>
            <span className="h-px w-8 bg-green-500"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Coleção de <span className="text-green-500">Croppeds</span>
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Confira os modelos mais vendidos com descontos especiais por tempo limitado.
            Peças exclusivas que combinam estilo e conforto.
          </p>
        </div>
        
        {/* Grid de produtos em destaque */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Produto 1 */}
          <div className="group">
            <div className="bg-white rounded-sm shadow-sm overflow-hidden relative">
              {/* Badge de desconto */}
              <div className="absolute top-0 right-0 z-10 bg-yellow-500 text-gray-900 text-xs font-bold px-2 py-1">
                30% OFF
              </div>
              
              {/* Imagem */}
              <div className="aspect-[3/4] bg-gray-50 relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80')] bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                ></div>
              </div>
              
              {/* Informações do produto */}
              <div className="p-4">
                <div className="mb-2">
                  <p className="text-xs text-gray-500 uppercase">NI Fashion</p>
                  <h3 className="text-sm font-medium text-gray-900 leading-tight line-clamp-2">
                    Cropped Essencial Modal
                  </h3>
                </div>
                
                <div className="mb-3">
                  <span className="text-xs text-gray-500 line-through">R$ 129,90</span>
                  <p className="text-lg font-bold text-gray-900">R$ 89,90</p>
                  <p className="text-xs text-green-600">Em até 3x de R$ 29,96</p>
                </div>
                
                <button className="w-full bg-green-500 text-white text-sm font-bold py-2 rounded-sm hover:bg-green-600 transition-colors">
                  COMPRAR
                </button>
              </div>
            </div>
          </div>
          
          {/* Produto 2 */}
          <div className="group">
            <div className="bg-white rounded-sm shadow-sm overflow-hidden relative">
              {/* Badge de novidade */}
              <div className="absolute top-0 left-0 z-10 bg-green-600 text-white text-xs font-bold px-2 py-1">
                NOVO
              </div>
              
              {/* Imagem */}
              <div className="aspect-[3/4] bg-gray-50 relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517677129300-07b130802f46?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80')] bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                ></div>
              </div>
              
              {/* Informações do produto */}
              <div className="p-4">
                <div className="mb-2">
                  <p className="text-xs text-gray-500 uppercase">NI Fashion</p>
                  <h3 className="text-sm font-medium text-gray-900 leading-tight line-clamp-2">
                    Cropped Premium Manga Longa
                  </h3>
                </div>
                
                <div className="mb-3">
                  <p className="text-lg font-bold text-gray-900">R$ 149,90</p>
                  <p className="text-xs text-green-600">Em até 5x de R$ 29,98</p>
                </div>
                
                <button className="w-full bg-green-500 text-white text-sm font-bold py-2 rounded-sm hover:bg-green-600 transition-colors">
                  COMPRAR
                </button>
              </div>
            </div>
          </div>
          
          {/* Produto 3 */}
          <div className="group">
            <div className="bg-white rounded-sm shadow-sm overflow-hidden relative">
              {/* Badge de exclusivo */}
              <div className="absolute top-0 left-0 z-10 bg-purple-600 text-white text-xs font-bold px-2 py-1">
                EXCLUSIVO
              </div>
              
              {/* Imagem */}
              <div className="aspect-[3/4] bg-gray-50 relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80')] bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                ></div>
              </div>
              
              {/* Informações do produto */}
              <div className="p-4">
                <div className="mb-2">
                  <p className="text-xs text-gray-500 uppercase">NI Fashion</p>
                  <h3 className="text-sm font-medium text-gray-900 leading-tight line-clamp-2">
                    Cropped Estruturado Decote V
                  </h3>
                </div>
                
                <div className="mb-3">
                  <span className="text-xs text-gray-500 line-through">R$ 199,90</span>
                  <p className="text-lg font-bold text-gray-900">R$ 139,90</p>
                  <p className="text-xs text-green-600">Em até 6x de R$ 23,31</p>
                </div>
                
                <button className="w-full bg-green-500 text-white text-sm font-bold py-2 rounded-sm hover:bg-green-600 transition-colors">
                  COMPRAR
                </button>
              </div>
            </div>
          </div>
          
          {/* Produto 4 */}
          <div className="group">
            <div className="bg-white rounded-sm shadow-sm overflow-hidden relative">
              {/* Badge de frete grátis */}
              <div className="absolute top-0 right-0 z-10 bg-blue-600 text-white text-xs font-bold px-2 py-1">
                FRETE GRÁTIS
              </div>
              
              {/* Imagem */}
              <div className="aspect-[3/4] bg-gray-50 relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80')] bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                ></div>
              </div>
              
              {/* Informações do produto */}
              <div className="p-4">
                <div className="mb-2">
                  <p className="text-xs text-gray-500 uppercase">NI Fashion</p>
                  <h3 className="text-sm font-medium text-gray-900 leading-tight line-clamp-2">
                    Cropped Moderno Alças Finas
                  </h3>
                </div>
                
                <div className="mb-3">
                  <span className="text-xs text-gray-500 line-through">R$ 159,90</span>
                  <p className="text-lg font-bold text-gray-900">R$ 99,90</p>
                  <p className="text-xs text-green-600">Em até 3x de R$ 33,30</p>
                </div>
                
                <button className="w-full bg-green-500 text-white text-sm font-bold py-2 rounded-sm hover:bg-green-600 transition-colors">
                  COMPRAR
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Ver mais produtos */}
        <div className="text-center mt-10">
          <Link 
            href="/croppeds"
            className="inline-flex items-center bg-transparent hover:bg-green-500 text-green-500 hover:text-white py-2 px-6 border border-green-500 hover:border-transparent rounded-sm font-medium transition-colors duration-300"
          >
            Ver todos os modelos
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
} 