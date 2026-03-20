import { useState } from 'react'
import { Header } from './components/Header'
import { PokemonGrid } from './components/PokemonGrid'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<string | null>(null)

  return (
    <main className={`min-h-screen ${darkMode ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
      <Header 
        darkMode={darkMode} 
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        search={search}
        onSearchChange={setSearch}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
      />
      <PokemonGrid 
        darkMode={darkMode} 
        search={search}
        typeFilter={typeFilter}
      />
    </main>
  )
}

export default App
