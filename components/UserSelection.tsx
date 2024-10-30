// components/UserSelection.tsx
'use client';

import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  username: string;
}

export default function UserSelection() {
  const [users, setUsers] = useState<User[]>([]);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Charger la liste des utilisateurs
  const loadUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (err) {
      console.error('Error loading users:', err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleUserSelect = (username: string) => {
    localStorage.setItem('gainzhub-user', username);
    window.location.reload();
  };

  const handleAddUser = async () => {
    if (!newUsername.trim()) {
      setError('Le nom ne peut pas être vide');
      return;
    }

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: newUsername.trim() })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      setUsers([...users, data]);
      setNewUsername('');
      setIsAddingUser(false);
      setError(null);
    } catch (err) {
      setError('Erreur lors de l\'ajout de l\'utilisateur');
    }
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
        {users.map(user => (
          <button 
            key={user.id}
            onClick={() => handleUserSelect(user.username)}
            className="w-full p-4 bg-[#1c2128] rounded-lg text-white hover:bg-[#22272e] text-left transition-colors"
          >
            {user.username}
          </button>
        ))}

        {isAddingUser ? (
          <div className="space-y-2">
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Nom de l'utilisateur"
              className="w-full p-4 bg-[#1c2128] rounded-lg text-white border-none focus:ring-1 focus:ring-indigo-500"
              autoFocus
            />
            
            {error && (
              <div className="text-red-400 text-sm px-1">
                {error}
              </div>
            )}

            <div className="flex space-x-2">
              <button
                onClick={handleAddUser}
                className="flex-1 p-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
              >
                Ajouter
              </button>
              <button
                onClick={() => {
                  setIsAddingUser(false);
                  setNewUsername('');
                  setError(null);
                }}
                className="flex-1 p-3 bg-[#1c2128] hover:bg-[#22272e] rounded-lg transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => setIsAddingUser(true)}
            className="w-full p-4 bg-[#1c2128] rounded-lg text-white/60 hover:bg-[#22272e] text-left transition-colors"
          >
            + Ajouter un utilisateur
          </button>
        )}
      </div>
    </main>
  );
}