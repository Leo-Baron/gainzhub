// components/MainMenu.tsx
'use client';

import React, { useEffect, useState } from 'react';

export default function MainMenu() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('gainzhub-user');
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('gainzhub-user');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <h1 className="text-2xl">
          <span className="text-white">Gainz</span>
          <span className="bg-orange-500 px-2 rounded">Hub</span>
        </h1>
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-2 text-white/60"
        >
          <div className="w-6 h-6 rounded-full bg-[#1c2128] flex items-center justify-center">
            👤
          </div>
          <span>{username}</span>
        </button>
      </div>

      {/* Menu Items */}
      <div className="p-6 space-y-3">
        {/* Séance du jour */}
        <button 
          onClick={() => {}} 
          className="w-full p-4 bg-indigo-600 rounded-lg text-white text-center font-medium"
        >
          + Séance du jour
        </button>

        {/* Dashboard */}
        <button 
          onClick={() => {}} 
          className="w-full p-4 bg-[#1c2128] rounded-lg text-white/80 text-left flex items-center space-x-3"
        >
          <span className="text-lg">📊</span>
          <span>Dashboard</span>
        </button>

        {/* Historique */}
        <button 
          onClick={() => {}} 
          className="w-full p-4 bg-[#1c2128] rounded-lg text-white/80 text-left flex items-center space-x-3"
        >
          <span className="text-lg">⏱️</span>
          <span>Historique</span>
        </button>

        {/* Biggest Boy */}
        <button 
          onClick={() => {}} 
          className="w-full p-4 bg-[#1c2128] rounded-lg text-white/80 text-left flex items-center space-x-3"
        >
          <span className="text-lg">🏆</span>
          <span>Qui est le Biggest Boy ?</span>
        </button>
      </div>
    </div>
  );
}