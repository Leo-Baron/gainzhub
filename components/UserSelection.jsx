import React from 'react';

export default function Home() {
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
          onClick={() => {
            localStorage.setItem('gainzhub-user', 'Léo');
            window.location.reload();
          }}
          className="w-full p-4 bg-[#1c2128] rounded-lg text-white hover:bg-[#22272e] text-left transition-colors"
        >
          Léo
        </button>
        
        <button 
          onClick={() => {
            localStorage.setItem('gainzhub-user', 'Nathan');
            window.location.reload();
          }}
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
