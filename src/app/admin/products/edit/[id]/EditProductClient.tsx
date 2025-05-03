"use client";
import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
        const storedImage = await imageService.saveImage(imageFile);
        imageUrl = storedImage.base64;
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
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Editar Produto</h1>
          <Link href="/admin/products" className="text-blue-600 hover:text-blue-800">
            Voltar para Produtos
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    required
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  />
                </div>

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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  >
                    {categories.filter(cat => cat !== 'Todos').map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="sizes" className="block text-sm font-medium text-gray-700">Tamanhos (separados por vírgula)</label>
                  <input
                    type="text"
                    id="sizes"
                    required
                    placeholder="P, M, G"
                    value={formData.sizes.join(', ')}
                    onChange={(e) => handleArrayChange(e, 'sizes')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  />
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">Imagem do Produto</label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                  <p className="mt-1 text-sm text-gray-500">Deixe em branco para manter a imagem atual</p>
                </div>

                {imagePreview && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-2">Imagem atual:</p>
                    <div className="w-32 h-32 relative border border-gray-200 rounded">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Link
                href="/admin/products"
                className="bg-gray-200 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
              >
                {saving ? 'Salvando...' : 'Atualizar Produto'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
} 