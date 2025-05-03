'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-gray-800 to-black min-h-[600px] flex items-center overflow-hidden">
      {/* Background com overlay para melhor contraste */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-black/80 z-10"></div>
      
      {/* Imagem de fundo do banner */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center"
        ></div>
      </div>
      
      {/* Elementos decorativos */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute top-10 right-10 w-64 h-64 border border-white/10 rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 border border-white/10 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0 animate-fade-in-up text-white">
            <div className="inline-flex items-center space-x-2 mb-6">
              <span className="w-8 h-0.5 bg-green-500"></span>
              <span className="text-green-500 text-sm font-bold uppercase tracking-wider">Nova Coleção 2023</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight font-bold">
              Estilo que <br /><span className="text-green-500">Define</span> Você
            </h1>
            
            <p className="text-lg text-gray-300 mb-8 max-w-lg">
              As melhores marcas e produtos com até 70% de desconto. 
              Encontre seu estilo perfeito para cada ocasião.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="#catalog" 
                className="bg-green-500 hover:bg-green-600 text-white py-3 px-8 rounded-sm transition-all duration-300 inline-flex items-center font-bold shadow-lg"
              >
                Ver Ofertas
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
              
              <Link 
                href="#cropped" 
                className="bg-transparent hover:bg-white/10 text-white py-3 px-8 rounded-sm transition-all duration-300 inline-block border border-white/30 font-medium"
              >
                Lançamentos
              </Link>
            </div>
            
            {/* Badges de vantagens */}
            <div className="grid grid-cols-3 gap-2 mt-12">
              <div className="flex items-center">
                <div className="rounded-full bg-white/10 p-2 mr-3">
                  <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </div>
                <span className="text-sm text-gray-300">Frete Grátis</span>
              </div>
              <div className="flex items-center">
                <div className="rounded-full bg-white/10 p-2 mr-3">
                  <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </div>
                <span className="text-sm text-gray-300">Até 10x s/ Juros</span>
              </div>
              <div className="flex items-center">
                <div className="rounded-full bg-white/10 p-2 mr-3">
                  <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </div>
                <span className="text-sm text-gray-300">Troca Garantida</span>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 flex justify-center relative">
            {/* Card destacado de produto */}
            <div className="bg-white/5 backdrop-blur-sm p-5 rounded-sm shadow-xl border border-white/10 transform lg:rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="absolute -top-4 -right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-sm">
                30% OFF
              </div>
              <div className="relative h-64 w-56 mb-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
                <div 
                  className="h-full w-full bg-[url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80')] bg-cover bg-center"
                ></div>
              </div>
              <h3 className="text-white text-lg font-medium mb-1">Conjunto Verão</h3>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-gray-400 text-xs line-through">R$ 299,99</span>
                  <p className="text-green-500 font-bold">R$ 199,99</p>
                </div>
                <button className="bg-green-500 hover:bg-green-600 text-white text-xs py-1 px-3 rounded-sm transition-colors duration-300">
                  Comprar
                </button>
              </div>
            </div>
            
            {/* Segundo card para efeito de profundidade */}
            <div className="absolute -bottom-8 -left-10 bg-white/5 backdrop-blur-sm p-5 rounded-sm shadow-xl border border-white/10 transform lg:-rotate-6 hidden md:block">
              <div className="relative h-40 w-36 mb-4 overflow-hidden">
                <div 
                  className="h-full w-full bg-[url('https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80')] bg-cover bg-center"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce flex flex-col items-center">
          <span className="text-white/70 text-xs mb-2">Scroll</span>
          <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
} 