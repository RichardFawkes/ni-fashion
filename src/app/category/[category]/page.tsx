import { Metadata } from 'next';
import CategoryPageClient from './CategoryPageClient';

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  return {
    title: `Categoria: ${category}`,
  };
}

export default async function Page({ params }: Props) {
  const { category } = await params;
  return <CategoryPageClient params={{ category }} />;
} 