'use client';

import Link from 'next/link';
// Removendo a importação problemática
// import { FiArrowRight } from 'react-icons/fi';

export default function CroppedBanner() {
  return (
    <section className="bg-gray-50 py-20 my-16 relative overflow-hidden">
      {/* Elementos decorativos minimalistas */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-20 -right-20 rounded-full border border-gray-200"></div>
        <div className="absolute w-64 h-64 -bottom-10 -left-10 rounded-full border border-gray-200"></div>
        <div className="absolute top-1/4 right-1/3 w-40 h-1 bg-gray-200 rotate-45"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-1 bg-gray-200 -rotate-45"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            <span className="inline-block text-xs font-accent uppercase tracking-wider text-gray-600 mb-3">Destaque da coleção</span>
            <h2 className="text-3xl md:text-4xl mb-6 font-heading font-light">
              A Arte dos <span className="font-medium">Croppeds</span>
            </h2>
            <p className="text-gray-700 mb-8 max-w-md leading-relaxed font-body font-light">
              Peças minimalistas que valorizam a silhueta e trazem refinamento ao seu visual. 
              Uma coleção pensada para o essencial, com design atemporal.
            </p>
            <Link 
              href="/cropped" 
              className="group inline-flex items-center font-accent"
            >
              <span className="text-black border-b border-black pb-1 mr-2 group-hover:border-gray-400 transition-colors">
                Explorar coleção completa
              </span>
              {/* Substituindo o ícone FiArrowRight por um SVG inline */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-black transition-transform group-hover:translate-x-1"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
          
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
            {/* Cards de produtos em formato minimalista */}
            <div className="bg-white p-4 shadow-sm transform hover:-translate-y-1 transition-all duration-300">
              <div className="aspect-[3/4] bg-gray-100 mb-4 flex items-center justify-center overflow-hidden">
                <div className="text-gray-400 font-light italic text-sm font-accent">Imagem Cropped</div>
                {/* Quando tiver imagem real, use: 
                <Image src="/images/cropped-1.jpg" alt="Cropped Elegante" fill className="object-cover" /> 
                */}
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-1 font-accent">Cropped Minimalista</h3>
              <p className="text-xs text-gray-600 font-light">Elegância essencial</p>
            </div>
            
            <div className="bg-white p-4 shadow-sm transform hover:-translate-y-1 transition-all duration-300 mt-6">
              <div className="aspect-[3/4] bg-gray-100 mb-4 flex items-center justify-center overflow-hidden">
                <div className="text-gray-400 font-light italic text-sm font-accent">Imagem Cropped</div>
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-1 font-accent">Cropped Estruturado</h3>
              <p className="text-xs text-gray-600 font-light">Design contemporâneo</p>
            </div>
            
            <div className="bg-white p-4 shadow-sm transform hover:-translate-y-1 transition-all duration-300 -mt-6">
              <div className="aspect-[3/4] bg-gray-100 mb-4 flex items-center justify-center overflow-hidden">
                <div className="text-gray-400 font-light italic text-sm font-accent">Imagem Cropped</div>
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-1 font-accent">Cropped Funcional</h3>
              <p className="text-xs text-gray-600 font-light">Versatilidade refinada</p>
            </div>
            
            <div className="bg-white p-4 shadow-sm transform hover:-translate-y-1 transition-all duration-300">
              <div className="aspect-[3/4] bg-gray-100 mb-4 flex items-center justify-center overflow-hidden">
                <div className="text-gray-400 font-light italic text-sm font-accent">Imagem Cropped</div>
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-1 font-accent">Cropped Assimétrico</h3>
              <p className="text-xs text-gray-600 font-light">Detalhes precisos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 