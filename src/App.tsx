import { useState, useEffect } from 'react'
import type { CreatedPokemon } from './types/pokemon'
import { Header } from './components/Header'
import { PokemonGrid } from './components/PokemonGrid'
import { CreatePokemonModal } from './components/CreatePokemonModal'
import { CreatedPokemonCard } from './components/CreatedPokemonCard'

const STORAGE_KEY = 'pokedex-created-pokemon'

function getStoredPokemon(): CreatedPokemon[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<string | null>(null)
  const [createdPokemon, setCreatedPokemon] = useState<CreatedPokemon[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showCreatedPanel, setShowCreatedPanel] = useState(false)

  useEffect(() => {
    setCreatedPokemon(getStoredPokemon())
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(createdPokemon))
  }, [createdPokemon])

  const handleCreatePokemon = (pokemon: CreatedPokemon) => {
    setCreatedPokemon(prev => [...prev, pokemon])
  }

  const handleDeletePokemon = (id: string) => {
    setCreatedPokemon(prev => prev.filter(p => p.id !== id))
  }

  return (
    <main className={`min-h-screen ${darkMode ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
      <Header 
        darkMode={darkMode} 
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        search={search}
        onSearchChange={setSearch}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        onCreateClick={() => setShowCreateModal(true)}
        onViewCreatedClick={() => setShowCreatedPanel(!showCreatedPanel)}
        createdCount={createdPokemon.length}
        showCreatedPanel={showCreatedPanel}
      />
      
      {showCreatedPanel && createdPokemon.length > 0 && (
        <div className={`border-b-4 ${darkMode ? 'border-zinc-700' : 'border-zinc-300'} ${darkMode ? 'bg-zinc-900' : 'bg-zinc-100'}`}>
          <div className="max-w-5xl mx-auto px-4 py-4">
            <h2 className={`text-lg font-bold mb-4 ${darkMode ? 'text-zinc-100' : 'text-zinc-800'}`}>
              CREATED POKEMON ({createdPokemon.length})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {createdPokemon.map((p) => (
                <CreatedPokemonCard key={p.id} pokemon={p} darkMode={darkMode} onDelete={handleDeletePokemon} />
              ))}
            </div>
          </div>
        </div>
      )}

      <PokemonGrid 
        darkMode={darkMode} 
        search={search}
        typeFilter={typeFilter}
      />

      <CreatePokemonModal 
        darkMode={darkMode}
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreatePokemon}
      />
    </main>
  )
}

export default App
