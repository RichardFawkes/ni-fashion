"use client";
import { saveImagesToFile, loadImagesFromFile } from './jsonFileService';
import { uploadImageFile } from './fileUploadService';

// Chave para armazenar os metadados das imagens no localStorage
const IMAGES_STORAGE_KEY = 'ni-fashion-images';

// Interface para os dados da imagem
export interface StoredImage {
  id: string;
  base64: string;
  name: string;
  mimeType: string;
  serverPath?: string;
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

// Função para inicializar as imagens carregando do arquivo se disponível
export const initializeImages = async () => {
  if (typeof window === 'undefined') return;
  
  const stored = localStorage.getItem(IMAGES_STORAGE_KEY);
  if (!stored) {
    try {
      const response = await loadImagesFromFile();
      if (response.success && response.data && response.data.length > 0) {
        localStorage.setItem(IMAGES_STORAGE_KEY, JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Erro ao carregar imagens do arquivo:', error);
    }
  }
};

// Função para salvar uma imagem
export const saveImage = async (file: File, category?: string): Promise<StoredImage> => {
  try {
    // 1. Fazer upload do arquivo para o servidor
    const formData = new FormData();
    formData.append('image', file);
    if (category) {
      formData.append('category', category);
    }
    
    // Upload do arquivo físico
    const uploadResult = await uploadImageFile(file);
    
    if (!uploadResult.success || !uploadResult.data) {
      throw new Error(uploadResult.error || 'Falha ao fazer upload da imagem');
    }
    
    // 2. Criar metadados da imagem (incluindo base64 para compatibilidade com o código existente)
    const base64 = await fileToBase64(file);
    const id = Date.now().toString();
    
    const imageData: StoredImage = {
      id,
      base64,
      name: file.name,
      mimeType: file.type,
      serverPath: uploadResult.data.path
    };
    
    // 3. Obter imagens existentes e adicionar a nova
    const images = getAllImages();
    images.push(imageData);
    
    // 4. Salvar metadados no localStorage
    localStorage.setItem(IMAGES_STORAGE_KEY, JSON.stringify(images));
    
    // 5. Salvar metadados no arquivo JSON
    await saveImagesToFile(images);
    
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

// Função para obter o URL de exibição de uma imagem
export const getDisplayImageUrl = (image: StoredImage): string => {
  // Priorizar o caminho do servidor se existir
  if (image.serverPath) {
    return image.serverPath;
  }
  
  // Caso contrário, usar o base64
  return image.base64;
};

// Função para remover uma imagem
export const removeImage = async (id: string): Promise<boolean> => {
  const images = getAllImages();
  const filteredImages = images.filter(img => img.id !== id);
  
  if (images.length !== filteredImages.length) {
    localStorage.setItem(IMAGES_STORAGE_KEY, JSON.stringify(filteredImages));
    
    // Salvar no arquivo JSON
    try {
      await saveImagesToFile(filteredImages);
      
      // Nota: Não removemos o arquivo físico do servidor para evitar problemas
      // com produtos que podem estar usando a mesma imagem
      
      return true;
    } catch (error) {
      console.error('Erro ao atualizar arquivo de imagens:', error);
    }
  }
  
  return false;
}; 