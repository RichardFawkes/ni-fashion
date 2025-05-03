'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-gray-50 to-white min-h-[600px] flex items-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-gray-100/50 blur-2xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-56 h-56 rounded-full bg-gray-200/30 blur-xl"></div>
        <div className="absolute top-1/2 left-3/4 w-40 h-40 rounded-full bg-gray-100/40 blur-xl"></div>
        
        {/* Elemento gráfico minimalista */}
        <div className="absolute bottom-10 right-10 text-gray-100 opacity-5 text-9xl font-heading font-light">N</div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0 animate-fade-in-up">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-none mb-4 font-accent uppercase tracking-widest">
              Coleção 2023
            </span>
            <h1 className="text-4xl md:text-5xl mb-6 leading-tight font-heading font-thin">
              Design que <span className="font-medium">Transcende</span><br />O Simples Vestir
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-md font-body font-light">
              Descubra peças que expressam personalidade através da simplicidade. 
              Moda consciente que valoriza o essencial.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="#catalog" 
                className="bg-black hover:bg-gray-800 text-white py-3 px-8 rounded-none transition-all duration-300 inline-block shadow-sm font-heading"
              >
                Ver Catálogo
              </Link>
              <Link 
                href="#cropped" 
                className="bg-white hover:bg-gray-50 text-black py-3 px-8 rounded-none transition-all duration-300 inline-block border border-gray-200 shadow-sm relative overflow-hidden group font-accent"
              >
                Croppeds
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </Link>
            </div>
            
            {/* Badges de valores */}
            <div className="flex flex-wrap gap-3 mt-8">
              <span className="text-xs bg-gray-50 text-gray-700 px-3 py-1 rounded-none font-accent uppercase tracking-wider">Produção Consciente</span>
              <span className="text-xs bg-gray-50 text-gray-700 px-3 py-1 rounded-none font-accent uppercase tracking-wider">Atemporal</span>
              <span className="text-xs bg-gray-50 text-gray-700 px-3 py-1 rounded-none font-accent uppercase tracking-wider">Design Brasileiro</span>
            </div>
          </div>
          
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              {/* Círculo decorativo principal */}
              <div className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-white rounded-full shadow-xl overflow-hidden relative">
                {/* Simula uma imagem dentro do círculo */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-heading font-light text-gray-800">NI FASHION</span>
                  </div>
                </div>
                {/* Quando tiver imagem real, use isto:
                <Image 
                  src="/images/hero-product.jpg" 
                  alt="Ni Fashion Destaque" 
                  fill 
                  className="object-cover" 
                  priority 
                />
                */}
              </div>
              
              {/* Pequenos elementos decorativos minimalistas */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-gray-800 font-accent text-xs uppercase tracking-wider">Essência</span>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-gray-800 font-accent text-xs uppercase tracking-wider">Estilo</span>
              </div>
              <div className="absolute top-1/2 -right-6 w-16 h-16 bg-black rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-accent text-xs uppercase tracking-wider">Design</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 