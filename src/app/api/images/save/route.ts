import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { images } = body;

    if (!Array.isArray(images)) {
      return NextResponse.json(
        { success: false, error: 'Formato inválido: imagens devem ser um array' },
        { status: 400 }
      );
    }

    // Caminho para o arquivo JSON
    const dataDir = path.join(process.cwd(), 'public', 'data');
    const filePath = path.join(dataDir, 'images.json');

    // Criar diretório de dados se não existir
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Escrever dados no arquivo
    fs.writeFileSync(filePath, JSON.stringify(images, null, 2));

    return NextResponse.json({
      success: true,
      message: 'Imagens salvas com sucesso'
    });
  } catch (error) {
    console.error('Erro ao salvar imagens:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno ao salvar imagens' },
      { status: 500 }
    );
  }
} 