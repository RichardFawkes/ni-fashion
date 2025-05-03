'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-sm py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className={`text-2xl font-bold ${isScrolled ? 'text-black' : 'text-white'}`}>
              <span className="text-white bg-black px-1">NI</span>FASHION
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className={`text-sm font-medium transition-colors duration-300 hover:text-gray-600 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
              Home
            </Link>
            <Link href="#catalog" className={`text-sm font-medium transition-colors duration-300 hover:text-gray-600 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
              Novidades
            </Link>
            <Link href="#catalog" className={`text-sm font-medium transition-colors duration-300 hover:text-gray-600 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
              Feminino
            </Link>
            <Link href="#cropped" className={`text-sm font-medium transition-colors duration-300 hover:text-gray-600 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
              Croppeds
            </Link>
            <Link href="#catalog" className={`text-sm font-medium transition-colors duration-300 hover:text-gray-600 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
              Ofertas
            </Link>
            <Link 
              href="https://wa.me/5511999999999" 
              target="_blank"
              className={`ml-4 px-5 py-2 text-white text-sm font-medium rounded-sm hover:bg-gray-700 transition-colors duration-300 ${isScrolled ? 'bg-black' : 'bg-black'}`}
            >
              CONTATO
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            {/* Ícone de carrinho */}
            <button className={`mr-4 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
            </button>
            
            {/* Botão do Menu */}
            <button 
              className={`focus:outline-none ${isScrolled ? 'text-gray-800' : 'text-white'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white mt-4 rounded-sm shadow-lg border border-gray-100 absolute left-0 right-0 mx-4">
            <nav className="flex flex-col py-2">
              <Link href="/" className="text-gray-800 hover:bg-gray-50 py-3 px-4 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="#catalog" className="text-gray-800 hover:bg-gray-50 py-3 px-4 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                Novidades
              </Link>
              <Link href="#catalog" className="text-gray-800 hover:bg-gray-50 py-3 px-4 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                Feminino
              </Link>
              <Link href="#cropped" className="text-gray-800 hover:bg-gray-50 py-3 px-4 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                Croppeds
              </Link>
              <Link href="#catalog" className="text-gray-800 hover:bg-gray-50 py-3 px-4 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                Ofertas
              </Link>
              <div className="border-t border-gray-100 my-2"></div>
              <Link 
                href="https://wa.me/5511999999999" 
                target="_blank"
                className="m-3 bg-black text-white py-2 px-4 text-center rounded-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CONTATO
              </Link>
            </nav>
          </div>
        )}
      </div>
      
      {/* Barra de promoção (Netshoes style) */}
      {isScrolled && (
        <div className="bg-black py-1 text-center text-xs font-bold text-white">
          FRETE GRÁTIS NAS COMPRAS ACIMA DE R$ 99 • APROVEITE NOSSAS OFERTAS COM ATÉ 70% OFF
        </div>
      )}
    </header>
  );
} 