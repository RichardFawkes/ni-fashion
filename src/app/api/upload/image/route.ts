import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { randomUUID } from 'crypto';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File | null;

    if (!image) {
      return NextResponse.json(
        { success: false, error: 'Nenhuma imagem fornecida' },
        { status: 400 }
      );
    }

    // Validar o tipo de arquivo
    if (!image.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, error: 'O arquivo deve ser uma imagem válida' },
        { status: 400 }
      );
    }

    // Obter a extensão do arquivo
    const fileType = image.type.split('/')[1];
    const buffer = await image.arrayBuffer();

    // Gerar um nome de arquivo único baseado na categoria (se disponível) ou aleatório
    let category = formData.get('category') as string | null;
    if (!category) {
      category = 'product';
    }
    
    // Normalizar a categoria para seguir o padrão de nomenclatura no README
    const normalizedCategory = category.toLowerCase()
      .replace(/\s+/g, '') // Remove espaços
      .replace(/[^a-z0-9]/g, ''); // Remove caracteres especiais
    
    // Verificar se a categoria é uma das padronizadas, caso contrário, usar "product"
    const validCategories = ['cropped', 'dress', 'blazer', 'pants', 'skirt', 'set', 'jacket'];
    const categoryPrefix = validCategories.includes(normalizedCategory) ? normalizedCategory : 'product';
    
    // Gerar um número sequencial baseado na data atual para o nome do arquivo
    const timestamp = Date.now();
    const uniqueId = randomUUID().substring(0, 8);
    const filename = `${categoryPrefix}_${timestamp}_${uniqueId}.${fileType}`;
    
    // Caminho para o diretório de imagens do catálogo
    const catalogDir = join(process.cwd(), 'public', 'images', 'catalog');
    
    // Criar diretório se não existir
    if (!existsSync(catalogDir)) {
      await mkdir(catalogDir, { recursive: true });
    }
    
    // Caminho completo para o arquivo
    const filePath = join(catalogDir, filename);
    
    // Escrever o arquivo
    await writeFile(filePath, Buffer.from(buffer));
    
    return NextResponse.json({
      success: true,
      data: {
        filename,
        path: `/images/catalog/${filename}`
      }
    });
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno ao processar upload' },
      { status: 500 }
    );
  }
} 