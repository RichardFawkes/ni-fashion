"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '../../data/products';
import * as productService from '../services/productService';
import * as imageService from '../services/imageService';
import { StoredImage } from '../services/imageService';

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [images, setImages] = useState<StoredImage[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = () => {
    setLoading(true);
    try {
      const allProducts = productService.getAllProducts();
      const allImages = imageService.getAllImages();
      
      setProducts(allProducts);
      setImages(allImages);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calcular estatísticas
  const categoryCount = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const totalProductSize = JSON.stringify(products).length;
  const totalImagesSize = JSON.stringify(images).length;
  const totalSize = totalProductSize + totalImagesSize;
  
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
          <div className="flex space-x-4">
            <Link 
              href="/" 
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded"
            >
              Ver Loja
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-12">
            <svg className="animate-spin h-8 w-8 text-blue-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-2 text-gray-600">Carregando dados...</p>
          </div>
        ) : (
          <>
            {/* Cards de estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-sm font-medium text-gray-500 uppercase mb-2">Total de Produtos</h2>
                <p className="text-3xl font-bold text-gray-900">{products.length}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-sm font-medium text-gray-500 uppercase mb-2">Total de Imagens</h2>
                <p className="text-3xl font-bold text-gray-900">{images.length}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-sm font-medium text-gray-500 uppercase mb-2">Espaço Utilizado</h2>
                <p className="text-3xl font-bold text-gray-900">{formatBytes(totalSize)}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Produtos: {formatBytes(totalProductSize)} | 
                  Imagens: {formatBytes(totalImagesSize)}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-sm font-medium text-gray-500 uppercase mb-2">Últimos Produtos</h2>
                <p className="text-3xl font-bold text-gray-900">
                  {products.length > 0 ? new Date(parseInt(products[products.length - 1].id)).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
            
            {/* Links para seções */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Link href="/admin/products" className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-lg shadow-md transition-colors duration-300">
                <h2 className="text-xl font-bold mb-2">Gerenciar Produtos</h2>
                <p className="text-blue-100">Adicionar, editar ou remover produtos da loja.</p>
              </Link>
              
              <Link href="/admin/products/new" className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-lg shadow-md transition-colors duration-300">
                <h2 className="text-xl font-bold mb-2">Adicionar Novo Produto</h2>
                <p className="text-green-100">Criar um novo produto para a loja.</p>
              </Link>
              
              <div className="bg-purple-500 hover:bg-purple-600 text-white p-6 rounded-lg shadow-md transition-colors duration-300 cursor-pointer" onClick={loadData}>
                <h2 className="text-xl font-bold mb-2">Atualizar Dados</h2>
                <p className="text-purple-100">Recarregar dados do localStorage e arquivos JSON.</p>
              </div>
            </div>
            
            {/* Categorias de produtos */}
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Produtos por Categoria</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(categoryCount).map(([category, count]) => (
                  <div key={category} className="border rounded-md p-4">
                    <h3 className="font-medium text-gray-800">{category}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-2xl font-bold text-gray-900">{count}</p>
                      <p className="text-sm text-gray-500">{Math.round((count / products.length) * 100)}%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(count / products.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Informações sobre o armazenamento */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Informações sobre Armazenamento</h2>
              <div className="text-gray-600">
                <p className="mb-2">
                  <strong>LocalStorage:</strong> Os dados estão armazenados no localStorage do navegador. Isto significa que eles são persistidos apenas neste navegador e dispositivo.
                </p>
                <p className="mb-2">
                  <strong>JSON Files:</strong> Os dados também são armazenados em arquivos JSON no servidor no diretório /public/data. Estes são carregados ao inicializar a aplicação.
                </p>
                <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <p className="text-yellow-700">
                    <strong>Nota:</strong> Se você limpar os dados do navegador, as informações no localStorage serão perdidas, mas poderão ser recuperadas dos arquivos JSON na próxima vez que a aplicação for carregada.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
} 