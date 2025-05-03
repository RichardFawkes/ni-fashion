"use client";
import { Product } from '../../data/products';
import { saveProductsToFile, loadProductsFromFile } from './jsonFileService';

// Chave para armazenar os produtos no localStorage
const PRODUCTS_STORAGE_KEY = 'ni-fashion-products';

// Função para obter todos os produtos
export const getAllProducts = (): Product[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error('Erro ao obter produtos:', error);
    return [];
  }
};

// Função para inicializar os produtos do localStorage com os valores padrão
export const initializeProducts = async (defaultProducts: Product[]) => {
  if (typeof window === 'undefined') return;
  
  const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
  if (!stored) {
    // Tentar carregar do arquivo JSON primeiro
    try {
      const response = await loadProductsFromFile();
      if (response.success && response.data && response.data.length > 0) {
        // Verificar se os dados são do tipo Product[]
        if (isProductArray(response.data)) {
          saveProducts(response.data);
          return;
        }
      }
    } catch (error) {
      console.error('Erro ao carregar produtos do arquivo:', error);
    }
    
    // Se não conseguir carregar do arquivo, usar os produtos padrão
    saveProducts(defaultProducts);
  }
};

// Função auxiliar para verificar se um array é do tipo Product[]
function isProductArray(data: unknown[]): data is Product[] {
  return data.every(item => 
    typeof item === 'object' &&
    item !== null &&
    'id' in item &&
    'name' in item &&
    'description' in item &&
    'price' in item &&
    'sizes' in item &&
    'colors' in item &&
    'category' in item &&
    'imageUrl' in item
  );
}

// Função para salvar todos os produtos
export const saveProducts = async (products: Product[]) => {
  if (typeof window === 'undefined') return;
  
  try {
    // Salvar no localStorage
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    
    // Salvar no arquivo JSON
    await saveProductsToFile(products);
  } catch (error) {
    console.error('Erro ao salvar produtos:', error);
  }
};

// Função para adicionar um novo produto
export const addProduct = async (product: Product) => {
  const products = getAllProducts();
  products.push(product);
  await saveProducts(products);
};

// Função para atualizar um produto existente
export const updateProduct = async (product: Product) => {
  const products = getAllProducts();
  const index = products.findIndex(p => p.id === product.id);
  
  if (index !== -1) {
    products[index] = product;
    await saveProducts(products);
    return true;
  }
  
  return false;
};

// Função para remover um produto
export const removeProduct = async (productId: string) => {
  const products = getAllProducts();
  const filteredProducts = products.filter(p => p.id !== productId);
  
  if (products.length !== filteredProducts.length) {
    await saveProducts(filteredProducts);
    return true;
  }
  
  return false;
};

// Função para obter um produto pelo ID
export const getProductById = (productId: string): Product | undefined => {
  const products = getAllProducts();
  return products.find(p => p.id === productId);
};

// Função para gerar um ID único para novos produtos
export const generateProductId = (): string => {
  return Date.now().toString();
};

// Função para obter produtos por categoria
export const getProductsByCategory = (category: string): Product[] => {
  const products = getAllProducts();
  return products.filter(product => product.category === category);
}; 