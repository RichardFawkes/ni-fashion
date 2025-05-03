"use client";

import { StoredImage } from './imageService';

// Interface para a resposta da API
interface UploadResponse {
  success: boolean;
  data?: {
    filename: string;
    path: string;
  };
  error?: string;
}

/**
 * Faz upload de um arquivo de imagem para o servidor
 * @param file Arquivo de imagem para upload
 * @returns Promise com o resultado do upload
 */
export const uploadImageFile = async (file: File): Promise<UploadResponse> => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/upload/image', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    return {
      success: false,
      error: 'Falha ao fazer upload da imagem'
    };
  }
};

/**
 * Converte uma URL de imagem do servidor para um caminho utilizável no front-end
 * @param filename Nome do arquivo no servidor
 * @returns Caminho para a imagem
 */
export const getImageUrl = (filename: string): string => {
  return `/images/catalog/${filename}`;
};

/**
 * Converte um objeto StoredImage para utilizar o formato de arquivo
 * @param image Objeto StoredImage com dados base64
 * @returns Promise com o resultado da conversão e upload
 */
export const convertStoredImageToFile = async (image: StoredImage): Promise<UploadResponse> => {
  try {
    // Converter base64 para Blob
    const response = await fetch(image.base64);
    const blob = await response.blob();
    
    // Criar File a partir do Blob
    const file = new File([blob], image.name, { type: image.mimeType });
    
    // Fazer upload do arquivo
    return await uploadImageFile(file);
  } catch (error) {
    console.error('Erro ao converter imagem base64 para arquivo:', error);
    return {
      success: false,
      error: 'Falha ao converter imagem base64 para arquivo'
    };
  }
}; 