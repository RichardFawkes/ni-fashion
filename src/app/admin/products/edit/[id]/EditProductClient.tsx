"use client";
import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../../../../../data/products';
import { categories } from '../../../../../data/products';
import * as productService from '../../../../services/productService';
import * as imageService from '../../../../services/imageService';

interface EditProductClientProps {
  params: {
    id: string;
  };
}

export default function EditProductClient({ params }: EditProductClientProps) {
  const { id } = params;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageChanged, setImageChanged] = useState(false);
  
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: '',
    sizes: [],
    colors: [],
    category: '',
    imageUrl: ''
  });

  // Carregar dados do produto
  useEffect(() => {
    const loadProduct = () => {
      const product = productService.getProductById(id);
      
      if (!product) {
        alert('Produto não encontrado!');
        router.push('/admin/products');
        return;
      }
      
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        sizes: product.sizes,
        colors: product.colors,
        category: product.category,
        imageUrl: product.imageUrl
      });
      
      if (product.imageUrl) {
        setImagePreview(product.imageUrl);
      }
      
      setLoading(false);
    };
    
    loadProduct();
  }, [id, router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleArrayChange = (e: ChangeEvent<HTMLInputElement>, field: 'sizes' | 'colors') => {
    const values = e.target.value.split(',').map(item => item.trim());
    setFormData({
      ...formData,
      [field]: values
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImageChanged(true);

    // Criar preview da imagem
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let imageUrl = formData.imageUrl;
      
      // Upload da imagem se foi alterada
      if (imageChanged && imageFile) {
        const storedImage = await imageService.saveImage(imageFile, formData.category);
        imageUrl = storedImage.serverPath || storedImage.base64;
      }

      // Atualizar produto
      const updatedProduct: Product = {
        id,
        ...formData,
        imageUrl
      };

      // Salvar produto atualizado
      productService.updateProduct(updatedProduct);
      
      router.push('/admin/products');
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      alert('Ocorreu um erro ao atualizar o produto. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-700 shadow-md">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Editar Produto</h1>
          <Link 
            href="/admin/products" 
            className="text-white bg-indigo-600 hover:bg-indigo-500 transition-colors px-4 py-2 rounded-md shadow-sm text-sm font-medium"
          >
            Voltar para Produtos
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Coluna 1 - Informações Básicas */}
              <div className="space-y-6 md:col-span-2">
                <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">Informações do Produto</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome do Produto</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border text-gray-800"
                      placeholder="Digite o nome do produto"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      required
                      value={formData.description}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border text-gray-800"
                      placeholder="Descreva detalhadamente o produto"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700">Preço</label>
                      <input
                        type="text"
                        id="price"
                        name="price"
                        required
                        placeholder="R$ 0,00"
                        value={formData.price}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border text-gray-800"
                      />
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoria</label>
                      <select
                        id="category"
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border text-gray-800"
                      >
                        <option value="" disabled>Selecione uma categoria</option>
                        {categories.filter(cat => cat !== 'Todos').map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="sizes" className="block text-sm font-medium text-gray-700">Tamanhos (separados por vírgula)</label>
                      <input
                        type="text"
                        id="sizes"
                        required
                        placeholder="P, M, G"
                        value={formData.sizes.join(', ')}
                        onChange={(e) => handleArrayChange(e, 'sizes')}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border text-gray-800"
                      />
                    </div>

                    <div>
                      <label htmlFor="colors" className="block text-sm font-medium text-gray-700">Cores (separadas por vírgula)</label>
                      <input
                        type="text"
                        id="colors"
                        required
                        placeholder="Preto, Branco, Azul"
                        value={formData.colors.join(', ')}
                        onChange={(e) => handleArrayChange(e, 'colors')}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border text-gray-800"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Coluna 2 - Imagem */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">Imagem do Produto</h2>
                
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">Selecionar Imagem</label>
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="block w-full text-sm text-gray-700
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-medium
                        file:bg-indigo-50 file:text-indigo-700
                        hover:file:bg-indigo-100 
                        transition-colors cursor-pointer"
                    />
                    <p className="mt-1 text-xs text-gray-500">Deixe em branco para manter a imagem atual</p>
                  </div>

                  {imagePreview ? (
                    <div className="mt-4">
                      <p className="text-sm text-gray-700 mb-2 font-medium">Visualização:</p>
                      <div className="w-full h-56 relative border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm">
                        {imagePreview && (
                          <div className="w-full h-full relative">
                            <Image
                              src={imagePreview}
                              alt="Preview"
                              fill
                              sizes="(max-width: 768px) 100vw, 300px"
                              className="object-contain"
                              unoptimized={imagePreview.startsWith('data:')}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-56 flex items-center justify-center border border-gray-200 rounded-md bg-gray-100">
                      <p className="text-gray-400 text-sm">Nenhuma imagem selecionada</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 flex justify-end space-x-3">
              <Link
                href="/admin/products"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Salvando...
                  </span>
                ) : 'Atualizar Produto'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
} 