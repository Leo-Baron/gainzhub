// components/UserSelection.tsx
'use client';

import React from 'react';

export default function UserSelection() {
  const handleUserSelect = (username: string) => {
    localStorage.setItem('gainzhub-user', username);
    window.location.reload();
  };

  return (
    <main className="min-h-screen bg-[#0d1117] p-6 text-white">
      <div className="flex justify-center pt-12 pb-8">
        <h1 className="text-2xl">
          <span className="text-white">Gainz</span>
          <span className="bg-orange-500 px-2 rounded">Hub</span>
        </h1>
      </div>

      <div className="space-y-3 max-w-md mx-auto">
        <button 
          onClick={() => handleUserSelect('Léo')}
          className="w-full p-4 bg-[#1c2128] rounded-lg text-white hover:bg-[#22272e] text-left transition-colors"
        >
          Léo
        </button>
        
        <button 
          onClick={() => handleUserSelect('Nathan')}
          className="w-full p-4 bg-[#1c2128] rounded-lg text-white hover:bg-[#22272e] text-left transition-colors"
        >
          Nathan
        </button>

        <button 
          className="w-full p-4 bg-[#1c2128] rounded-lg text-white/60 hover:bg-[#22272e] text-left transition-colors"
        >
          + Ajouter un utilisateur
        </button>
      </div>
    </main>
  );
}