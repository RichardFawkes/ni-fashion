import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Caminho para o arquivo JSON
    const filePath = path.join(process.cwd(), 'public', 'data', 'products.json');

    // Verificar se o arquivo existe
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({
        success: true,
        data: []
      });
    }

    // Ler dados do arquivo
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const products = JSON.parse(fileContent);

    return NextResponse.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno ao carregar produtos' },
      { status: 500 }
    );
  }
} 