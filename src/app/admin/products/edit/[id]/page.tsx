import EditProductClient from './EditProductClient';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Editar Produto #${id}`,
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <EditProductClient params={{ id }} />;
} 