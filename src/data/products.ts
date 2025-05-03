export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  sizes: string[];
  colors: string[];
  category: string;
  imageUrl: string;
}

export const products: Product[] = [
  {
    id: "cropped-01",
    name: "Blusa Cropped Manga Curta Canelado",
    description: "Cropped canelado com manga curta e gola alta. Peça versátil que valoriza a silhueta com modelagem ajustada ao corpo.",
    price: "R$ 59,90",
    sizes: ["P", "M", "G"],
    colors: ["Pink", "Vermelho", "Azul Marinho", "Preto", "Verde"],
    category: "Cropped",
    imageUrl: "/images/cropped/cropped-01-pink.jpg"
  },
  {
    id: "cropped-02",
    name: "Cropped Regata Gola Alta Canelado",
    description: "Cropped regata canelado com gola alta. Modelo confortável e elegante para diversas ocasiões.",
    price: "R$ 49,90",
    sizes: ["P", "M", "G"],
    colors: ["Vermelho", "Verde", "Pink", "Preto", "Azul Marinho"],
    category: "Cropped",
    imageUrl: "/images/cropped/cropped-02-vermelho.jpg"
  },
  {
    id: "cropped-03",
    name: "Blusa Cropped Frente Única Canelada",
    description: "Cropped modelo frente única em tecido canelado. Design moderno e confortável que valoriza os ombros.",
    price: "R$ 54,90",
    sizes: ["P", "M", "G"],
    colors: ["Pink", "Vermelho", "Verde", "Azul Marinho", "Preto"],
    category: "Cropped",
    imageUrl: "/images/cropped/cropped-03-pink.jpg"
  },
  {
    id: "cropped-04",
    name: "Cropped 2 Em 1 Com Amarração Manga Flare",
    description: "Cropped duplo com amarração e mangas flare. Um modelo sofisticado e cheio de personalidade.",
    price: "R$ 79,90",
    sizes: ["P", "M", "G"],
    colors: ["Vinho", "Pink", "Azul", "Preto", "Verde"],
    category: "Cropped",
    imageUrl: "/images/cropped/cropped-04-vinho.jpg"
  },
  {
    id: "cropped-05",
    name: "Cropped Básico",
    description: "Cropped básico em algodão com elastano. Peça versátil para compor diversos looks casuais.",
    price: "R$ 79,90",
    sizes: ["P", "M", "G"],
    colors: ["Preto", "Branco", "Azul"],
    category: "Cropped",
    imageUrl: "/images/cropped/cropped-05-preto.jpg"
  },
  {
    id: "6",
    name: "Vestido Ombro a Ombro",
    description: "Vestido elegante com corte ombro a ombro em tecido fluido. Perfeito para ocasiões especiais.",
    price: "R$ 259,90",
    sizes: ["P", "M", "G"],
    colors: ["Preto", "Bege", "Rosê"],
    category: "Novidades",
    imageUrl: "/images/dress1.jpg"
  },
  {
    id: "7",
    name: "Blazer Estruturado",
    description: "Blazer com corte estruturado e acabamento premium. Versátil para looks formais e casuais.",
    price: "R$ 329,90",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto", "Branco", "Creme"],
    category: "Coleção Exclusiva",
    imageUrl: "/images/blazer1.jpg"
  },
  {
    id: "8",
    name: "Calça Alfaiataria",
    description: "Calça de alfaiataria com caimento perfeito. Conforto e elegância para o dia a dia.",
    price: "R$ 189,90",
    sizes: ["36", "38", "40", "42", "44"],
    colors: ["Preto", "Bege", "Azul Marinho"],
    category: "Looks de Inverno",
    imageUrl: "/images/pants1.jpg"
  },
  {
    id: "9",
    name: "Blusa em Seda",
    description: "Blusa confeccionada em seda pura com acabamento premium. Delicada e sofisticada.",
    price: "R$ 219,90",
    sizes: ["P", "M", "G"],
    colors: ["Branco", "Preto", "Dourado"],
    category: "Coleção Exclusiva",
    imageUrl: "/images/blouse1.jpg"
  },
  {
    id: "10",
    name: "Saia Midi Plissada",
    description: "Saia midi plissada com cintura alta. Feminina e versátil para diversas ocasiões.",
    price: "R$ 179,90",
    sizes: ["P", "M", "G"],
    colors: ["Preto", "Dourado", "Prata"],
    category: "Novidades",
    imageUrl: "/images/skirt1.jpg"
  },
  {
    id: "11",
    name: "Conjunto Tweed",
    description: "Conjunto em tweed com shorts e blazer. Elegante e moderno para looks sofisticados.",
    price: "R$ 399,90",
    sizes: ["P", "M", "G"],
    colors: ["Preto", "Creme", "Rosa Claro"],
    category: "Looks de Inverno",
    imageUrl: "/images/set1.jpg"
  },
  {
    id: "12",
    name: "Vestido Longo",
    description: "Vestido longo com fenda lateral. Ideal para eventos especiais e noites elegantes.",
    price: "R$ 369,90",
    sizes: ["P", "M", "G"],
    colors: ["Preto", "Vermelho", "Azul Marinho"],
    category: "Coleção Exclusiva",
    imageUrl: "/images/dress2.jpg"
  },
  {
    id: "13",
    name: "Jaqueta de Couro",
    description: "Jaqueta de couro ecológico com detalhes em zíper. Estilosa e atemporal.",
    price: "R$ 299,90",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto", "Marrom"],
    category: "Looks de Inverno",
    imageUrl: "/images/jacket1.jpg"
  }
];

export const categories = [
  "Todos",
  "Cropped",
  "Novidades",
  "Coleção Exclusiva",
  "Looks de Inverno"
]; 