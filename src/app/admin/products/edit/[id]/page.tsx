import EditProductClient from './EditProductClient';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// This is the server component that handles the params
export default async function EditProductPage({ params }: PageProps) {
  // Resolve the params before passing to client component
  const resolvedParams = await params;
  
  // Pass the resolved params to the client component
  return <EditProductClient params={resolvedParams} />;
} 