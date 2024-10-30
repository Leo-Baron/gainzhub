// app/page.tsx
import dynamic from 'next/dynamic';

// Import dynamique pour éviter les erreurs de hydration avec localStorage
const MainMenu = dynamic(() => import('@/components/MainMenu'), { ssr: false });
const UserSelection = dynamic(() => import('@/components/UserSelection'), { ssr: false });

export default function Home() {
  return (
    <ClientPage />
  );
}

// Composant client séparé pour gérer la logique côté client
'use client';
function ClientPage() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasUser, setHasUser] = React.useState(false);

  React.useEffect(() => {
    const user = localStorage.getItem('gainzhub-user');
    setHasUser(!!user);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="text-white/60">Chargement...</div>
      </div>
    );
  }

  return hasUser ? <MainMenu /> : <UserSelection />;
}