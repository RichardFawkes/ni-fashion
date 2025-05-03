# Ni Fashion - Catálogo Digital

Este é um catálogo digital elegante e moderno para a marca Ni Fashion, com foco em facilitar a compra por meio de links diretos para o WhatsApp.

## Características

- Design limpo e minimalista, com cores neutras e elegantes
- Exibição clara das peças com detalhes de cada produto
- Filtro por categorias para facilitar a navegação
- Categoria dedicada para Croppeds (peças mais populares)
- Botões de "Comprar no WhatsApp" que direcionam o cliente para conversas no WhatsApp
- Navegação simples e intuitiva
- Layout responsivo para dispositivos móveis e desktop
- Gerador de imagens temporárias para visualização do catálogo

## Tecnologias Utilizadas

- Next.js
- React
- TailwindCSS
- TypeScript

## Configuração

1. Clone este repositório
2. Instale as dependências com `npm install`
3. Execute o projeto em modo de desenvolvimento com `npm run dev`
4. Acesse http://localhost:3000

## Configuração do WhatsApp

Para configurar o número de WhatsApp para contato:

1. Abra o arquivo `src/app/page.tsx`
2. Localize a variável `whatsappNumber` 
3. Altere para o número de WhatsApp desejado, incluindo o código do país (Ex: "5511999999999")

## Gerando e Adicionando Imagens

### Ferramenta de Geração de Imagens

O projeto inclui uma ferramenta para gerar imagens temporárias para o catálogo:

1. Acesse http://localhost:3000/image-generator
2. Selecione a categoria desejada no filtro
3. Clique em "Exportar Todas as Imagens"
4. Salve as imagens geradas na pasta `public/images/`

### Adicionando suas Próprias Imagens

Para adicionar imagens dos produtos:

1. Coloque as imagens na pasta `public/images/`
2. Siga o padrão de nomenclatura descrito em `public/images/README.md`
3. Certifique-se de que as imagens correspondam aos caminhos definidos em `src/data/products.ts`

## Categoria de Croppeds

A categoria "Cropped" já está configurada com 5 modelos diferentes:

- Cropped Básico
- Cropped Canelado
- Cropped de Renda
- Cropped Manga Longa
- Cropped Ombro a Ombro

Você pode adicionar mais modelos editando o arquivo `src/data/products.ts`.

## Personalização

- Para alterar as cores e estilos globais, edite o arquivo `src/app/globals.css`
- Para adicionar ou modificar produtos, edite o arquivo `src/data/products.ts`
- Para ajustar as categorias, modifique o array `categories` no arquivo `src/data/products.ts`

## Contato

Para questões e suporte relacionados a este projeto, entre em contato através do WhatsApp: [SEU NÚMERO DE CONTATO]
