"use client";
import { Product } from '../../data/products';

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
export const initializeProducts = (defaultProducts: Product[]) => {
  if (typeof window === 'undefined') return;
  
  const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
  if (!stored) {
    saveProducts(defaultProducts);
  }
};

// Função para salvar todos os produtos
export const saveProducts = (products: Product[]) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error('Erro ao salvar produtos:', error);
  }
};

// Função para adicionar um novo produto
export const addProduct = (product: Product) => {
  const products = getAllProducts();
  products.push(product);
  saveProducts(products);
};

// Função para atualizar um produto existente
export const updateProduct = (product: Product) => {
  const products = getAllProducts();
  const index = products.findIndex(p => p.id === product.id);
  
  if (index !== -1) {
    products[index] = product;
    saveProducts(products);
    return true;
  }
  
  return false;
};

// Função para remover um produto
export const removeProduct = (productId: string) => {
  const products = getAllProducts();
  const filteredProducts = products.filter(p => p.id !== productId);
  
  if (products.length !== filteredProducts.length) {
    saveProducts(filteredProducts);
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