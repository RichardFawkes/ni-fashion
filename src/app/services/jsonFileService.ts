"use client";

import { Product } from '../../data/products';
import { StoredImage } from './imageService';

// Interface para a resposta da API
interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

// Função para salvar produtos em um arquivo JSON no servidor
export const saveProductsToFile = async (products: Product[]): Promise<ApiResponse> => {
  try {
    const response = await fetch('/api/products/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ products }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Erro ao salvar produtos no arquivo:', error);
    return {
      success: false,
      error: 'Falha ao salvar produtos no arquivo'
    };
  }
};

// Função para carregar produtos de um arquivo JSON do servidor
export const loadProductsFromFile = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch('/api/products/load', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Erro ao carregar produtos do arquivo:', error);
    return {
      success: false,
      error: 'Falha ao carregar produtos do arquivo'
    };
  }
};

// Função para salvar imagens em um arquivo JSON no servidor
export const saveImagesToFile = async (images: StoredImage[]): Promise<ApiResponse> => {
  try {
    const response = await fetch('/api/images/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ images }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Erro ao salvar imagens no arquivo:', error);
    return {
      success: false,
      error: 'Falha ao salvar imagens no arquivo'
    };
  }
};

// Função para carregar imagens de um arquivo JSON do servidor
export const loadImagesFromFile = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch('/api/images/load', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Erro ao carregar imagens do arquivo:', error);
    return {
      success: false,
      error: 'Falha ao carregar imagens do arquivo'
    };
  }
}; 