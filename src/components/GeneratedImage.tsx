'use client';

import { useEffect, useRef } from 'react';

interface GeneratedImageProps {
  text: string;
  category: string;
  width: number;
  height: number;
  backgroundColor?: string;
  textColor?: string;
}

export default function GeneratedImage({
  text,
  category,
  width,
  height,
  backgroundColor = '#f5f5f5',
  textColor = '#0f0f0f',
}: GeneratedImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Cores por categoria - Paleta monocromática elegante
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Cropped': '#f5f5f5', // Branco levemente acinzentado
      'Novidades': '#f0f0f0', // Cinza muito claro
      'Coleção Exclusiva': '#e8e8e8', // Cinza claro
      'Looks de Inverno': '#ebebeb', // Cinza claro levemente diferente
    };
    
    return colors[category] || backgroundColor;
  };

  // Cor secundária para decoração - Tons de cinza
  const getSecondaryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Cropped': '#333333', // Cinza escuro
      'Novidades': '#444444', // Cinza médio-escuro
      'Coleção Exclusiva': '#555555', // Cinza médio
      'Looks de Inverno': '#666666', // Cinza médio-claro
    };
    
    return colors[category] || '#333333';
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Definir o fundo
    const bgColor = getCategoryColor(category);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
    
    // Estilo minimalista com sutis gradientes em tons de cinza
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, bgColor);
    const endColor = bgColor === '#f5f5f5' ? '#e5e5e5' : '#f5f5f5';
    gradient.addColorStop(1, endColor);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Adicionar elementos minimalistas decorativos
    const secondaryColor = getSecondaryColor(category);
    
    // Linha horizontal elegante
    ctx.strokeStyle = secondaryColor;
    ctx.globalAlpha = 0.1;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(width * 0.1, height * 0.3);
    ctx.lineTo(width * 0.9, height * 0.3);
    ctx.stroke();
    
    // Linha vertical elegante
    ctx.beginPath();
    ctx.moveTo(width * 0.7, height * 0.1);
    ctx.lineTo(width * 0.7, height * 0.5);
    ctx.stroke();
    
    // Pequeno quadrado sutil
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = secondaryColor;
    ctx.fillRect(width * 0.2, height * 0.2, width * 0.15, width * 0.15);
    
    // Pequeno círculo sutil
    ctx.beginPath();
    ctx.arc(width * 0.8, height * 0.8, width * 0.08, 0, Math.PI * 2);
    ctx.fill();
    
    // Restaurar opacidade
    ctx.globalAlpha = 1;
    
    // Área para "imagem do produto" - mais elegante e minimalista
    const mockProductWidth = width * 0.6;
    const mockProductHeight = height * 0.5;
    const mockProductX = (width - mockProductWidth) / 2;
    const mockProductY = height * 0.15;
    
    // Borda sutil em vez de fundo
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.lineWidth = 1;
    ctx.strokeRect(mockProductX, mockProductY, mockProductWidth, mockProductHeight);
    
    // Desenhar o nome do produto com tipografia mais refinada
    ctx.fillStyle = textColor;
    ctx.font = '300 18px "Playfair Display", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Quebrar o texto em linhas se for muito longo
    const words = text.split(' ');
    let line = '';
    const lines = [];
    const maxWidth = width * 0.7;
    
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && i > 0) {
        lines.push(line);
        line = words[i] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line);
    
    // Desenhar as linhas de texto abaixo da "imagem do produto"
    const textY = mockProductY + mockProductHeight + 50;
    const lineHeight = 25;
    
    lines.forEach((line, index) => {
      ctx.fillText(line, width / 2, textY + index * lineHeight);
    });
    
    // Desenhar a categoria de forma mais elegante
    ctx.font = '300 12px "Inter", sans-serif';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.letterSpacing = '0.05em'; // Não funciona no canvas, apenas ilustrativo
    ctx.fillText(category.toUpperCase(), width / 2, textY + lines.length * lineHeight + 25);
    
    // Desenhar o preço (simulado) com estilo refinado
    const mockPrice = "R$ " + (Math.floor(Math.random() * 200) + 80) + ",90";
    ctx.font = '500 16px "Inter", sans-serif';
    ctx.fillStyle = '#000000';
    ctx.fillText(mockPrice, width / 2, textY + lines.length * lineHeight + 55);
    
    // Adicionar tag de "NOVO" no canto superior direito em estilo minimalista
    if (category === 'Cropped' || category === 'Novidades') {
      ctx.fillStyle = '#000000';
      ctx.fillRect(width - 80, 20, 60, 25);
      ctx.fillStyle = 'white';
      ctx.font = '500 10px "Inter", sans-serif';
      ctx.fillText('NOVO', width - 50, 33);
    }

  }, [text, category, width, height, backgroundColor, textColor]);

  return (
    <canvas 
      ref={canvasRef} 
      width={width} 
      height={height}
      className="shadow-sm rounded-none border border-gray-100"
    />
  );
} 