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
            <span className={`text-2xl ${isScrolled ? 'text-black' : 'text-black'} fashion-display`}>
              <span className="font-semibold">NI</span>FASHION
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className={`text-sm transition-colors duration-300 hover:text-black fashion-accent ${isScrolled ? 'text-gray-700' : 'text-gray-800'}`}>
              Home
            </Link>
            <Link href="#catalog" className={`text-sm transition-colors duration-300 hover:text-black fashion-accent ${isScrolled ? 'text-gray-700' : 'text-gray-800'}`}>
              Catálogo
            </Link>
            <Link href="#cropped" className={`text-sm transition-colors duration-300 hover:text-black fashion-accent ${isScrolled ? 'text-gray-700' : 'text-gray-800'}`}>
              Croppeds
            </Link>
            <Link href="/image-generator" className={`text-sm transition-colors duration-300 hover:text-black fashion-accent ${isScrolled ? 'text-gray-700' : 'text-gray-800'}`}>
              Gerenciador
            </Link>
            <Link 
              href="https://wa.me/5511999999999" 
              target="_blank"
              className="ml-4 px-4 py-2 bg-black text-white text-sm uppercase-spaced hover:bg-gray-800 transition-colors duration-300"
            >
              Contato
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-800 focus:outline-none"
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3 mt-4">
              <Link href="/" className="text-gray-800 py-2 hover:text-black fashion-accent" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="#catalog" className="text-gray-800 py-2 hover:text-black fashion-accent" onClick={() => setIsMobileMenuOpen(false)}>
                Catálogo
              </Link>
              <Link href="#cropped" className="text-gray-800 py-2 hover:text-black fashion-accent" onClick={() => setIsMobileMenuOpen(false)}>
                Croppeds
              </Link>
              <Link href="/image-generator" className="text-gray-800 py-2 hover:text-black fashion-accent" onClick={() => setIsMobileMenuOpen(false)}>
                Gerenciador
              </Link>
              <Link 
                href="https://wa.me/5511999999999" 
                target="_blank"
                className="mt-2 bg-black text-white py-2 px-4 text-center hover:bg-gray-800 transition-colors duration-300 uppercase-spaced"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contato
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 