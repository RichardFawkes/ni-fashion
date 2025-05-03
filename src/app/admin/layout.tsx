"use client";
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Verificação do localStorage no lado do cliente
    const checkAuth = () => {
      const auth = localStorage.getItem('adminAuthenticated');
      setIsAuthenticated(auth === 'true');
      setLoading(false);

      // Se não estiver autenticado e não estiver na página de login, redirecionar
      if (auth !== 'true' && pathname !== '/admin') {
        router.push('/admin');
      }
    };

    checkAuth();
  }, [pathname, router]);

  // Mostrar loading enquanto verifica a autenticação
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Na página de login não precisa de verificação
  if (pathname === '/admin') {
    return <>{children}</>;
  }

  // Se estiver autenticado, mostra o conteúdo da área admin
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Fallback - não deveria chegar aqui pois o redirecionamento ocorre no useEffect
  return null;
} 