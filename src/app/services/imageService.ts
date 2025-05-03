"use client";

// Chave para armazenar as imagens no localStorage
const IMAGES_STORAGE_KEY = 'ni-fashion-images';

// Interface para os dados da imagem
export interface StoredImage {
  id: string;
  base64: string;
  name: string;
  mimeType: string;
}

// Função para converter um arquivo para base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// Função para salvar uma imagem
export const saveImage = async (file: File): Promise<StoredImage> => {
  try {
    const base64 = await fileToBase64(file);
    const id = Date.now().toString();
    
    const imageData: StoredImage = {
      id,
      base64,
      name: file.name,
      mimeType: file.type
    };
    
    // Obter imagens existentes
    const images = getAllImages();
    images.push(imageData);
    
    // Salvar no localStorage
    localStorage.setItem(IMAGES_STORAGE_KEY, JSON.stringify(images));
    
    return imageData;
  } catch (error) {
    console.error('Erro ao salvar imagem:', error);
    throw error;
  }
};

// Função para obter todas as imagens
export const getAllImages = (): StoredImage[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(IMAGES_STORAGE_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error('Erro ao obter imagens:', error);
    return [];
  }
};

// Função para obter uma imagem pelo ID
export const getImageById = (id: string): StoredImage | undefined => {
  const images = getAllImages();
  return images.find(img => img.id === id);
};

// Função para remover uma imagem
export const removeImage = (id: string): boolean => {
  const images = getAllImages();
  const filteredImages = images.filter(img => img.id !== id);
  
  if (images.length !== filteredImages.length) {
    localStorage.setItem(IMAGES_STORAGE_KEY, JSON.stringify(filteredImages));
    return true;
  }
  
  return false;
}; 