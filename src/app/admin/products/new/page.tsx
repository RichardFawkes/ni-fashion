import NewProductClient from './NewProductClient';
import { Metadata } from 'next';

type Props = {
  params: Promise<Record<string, never>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await params; // Ensure we handle the promise
  return {
    title: 'Novo Produto',
  };
}

export default async function Page({ params }: Props) {
  await params; // Ensure we handle the promise
  return <NewProductClient />;
} 