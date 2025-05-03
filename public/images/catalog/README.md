# Imagens do Catálogo Ni Fashion

Esta pasta contém as imagens dos produtos utilizadas no catálogo digital da Ni Fashion, salvas fisicamente no servidor.

## Padrão de Nomenclatura

As imagens seguem este padrão de nomenclatura:

- `cropped_[timestamp]_[id].jpg` - Para imagens de cropped
- `dress_[timestamp]_[id].jpg` - Para imagens de vestidos
- `blazer_[timestamp]_[id].jpg` - Para imagens de blazers
- `pants_[timestamp]_[id].jpg` - Para imagens de calças
- `skirt_[timestamp]_[id].jpg` - Para imagens de saias
- `set_[timestamp]_[id].jpg` - Para imagens de conjuntos
- `jacket_[timestamp]_[id].jpg` - Para imagens de jaquetas
- `product_[timestamp]_[id].jpg` - Para imagens de outros tipos de produtos

Onde:
- `[timestamp]` é o momento em que a imagem foi salva (em milissegundos desde 1970)
- `[id]` é um identificador único gerado para garantir que não haja colisões
- A extensão `.jpg` pode variar dependendo do tipo de arquivo carregado (`.png`, `.jpeg`, etc.)

## Como as Imagens São Salvas

1. Quando um administrador adiciona ou atualiza um produto, a imagem é:
   - Enviada para o servidor via API
   - Salva fisicamente neste diretório com o padrão de nome descrito acima
   - O caminho da imagem é armazenado no objeto do produto no arquivo JSON

2. As imagens são referenciadas nas páginas do site usando caminhos relativos, como:
   `/images/catalog/dress_1706123456789_a1b2c3d4.jpg`

## Dimensões Recomendadas

Para melhor exibição no catálogo, recomendamos:

- Proporção 4:5 (por exemplo: 800x1000 pixels)
- Resolução mínima de 800x1000 pixels
- Formato JPG ou PNG
- Tamanho máximo de arquivo: 500KB

## Nota Importante

Estas imagens são gravadas fisicamente no servidor e não são mais armazenadas como strings base64 no localStorage. Isto significa:

- As imagens são permanentes e não são perdidas quando o browser é fechado
- As imagens podem ser acessadas de qualquer dispositivo ou navegador
- O carregamento das páginas se torna mais rápido, pois não há grandes strings base64 no código
- O sistema é mais eficiente em termos de uso de memória e armazenamento

## Manutenção

Embora o sistema não remova automaticamente imagens antigas quando produtos são excluídos (para evitar problemas com produtos que possam referenciar as mesmas imagens), ocasionalmente pode ser útil limpar imagens que não estão mais em uso para economizar espaço em disco. 